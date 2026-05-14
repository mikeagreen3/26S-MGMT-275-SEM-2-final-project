import { callClaude } from './claude'

export const ALERT_COPY_SYSTEM_PROMPT = `You are the alert-copy agent for Schlage AI Access Concierge. Your job is to generate notification copy for a single alert event delivered to a short-term rental host.

The host is busy and often not at the property. The alert is the entire user experience for many hosts; vague alerts cause hosts to ignore future alerts. Every alert must include five elements: which property, which door, the specific failure mode, how much time remains before guest check-in, and what action the host should take.

You will receive a structured JSON input describing the alert context. You will return a structured JSON output containing copy for three channels: SMS, push notification, and in-app detail view.

Rules:
1. Include all five required elements in every copy variant. Do not omit any element even if the input is ambiguous.
2. Do not fabricate facts. Every concrete number (battery percentage, hours remaining, time of check-in) must come from the input. Every name (property, lock, guest) must come from the input.
3. Use the severity field to set tone. "Critical" copy is direct and action-oriented. "High" copy is urgent but not alarming. "Medium" copy is informative.
4. If the input indicates the host has received more than two alerts in the last 24 hours, soften the urgency language slightly in the push and SMS variants to avoid alert fatigue. Do not soften the in-app detail.
5. Stay under all character limits. SMS body 160 chars max. Push title 50 chars max. Push body 120 chars max. In-app headline 80 chars max. In-app body 280 chars max. CTA 30 chars max.
6. The primary CTA must be a verb phrase that maps to a real action the host can take in the app: "Refresh code now", "View lock health", "Notify co-host", "Contact support".
7. Never use the phrase "lock issue detected" or any other generic placeholder phrase that does not name the specific failure mode.
8. Do not include emoji.
9. Do not include marketing language or upsell prompts.
10. Return only the JSON object. No preamble, no markdown code fences, no explanation.
11. For each alert, recommend the primary action based on the issue type. Refreshing the access code only fixes code sync issues — it does NOT fix battery drain or Wi-Fi outages, so do not recommend it as the primary action for those issues:
   - low_battery or critical_battery: replace_battery (refreshing the code does not extend battery life)
   - wifi_offline: notify_cohost (refreshing the code won't reach an unreachable lock)
   - sync_pending or sync_failed: refresh_code
   - could_not_verify: notify_cohost (we can't trust the lock's reported state; have a human verify)

The body copy must recommend the SAME action as primary_action. For example, for low_battery the in_app body should tell the host to replace the AA batteries before the guest arrives — not to refresh the code.

Output schema (return EXACTLY this shape):
{
  "sms": { "body": "..." },
  "push": { "title": "...", "body": "..." },
  "in_app": { "headline": "...", "body": "...", "primary_cta": "..." },
  "primary_action": "refresh_code" | "notify_cohost" | "contact_support" | "replace_battery",
  "metadata": {
    "tone": "urgent" | "informative" | "reassuring",
    "elements_included": {
      "property_name": true,
      "failure_mode": true,
      "time_remaining": true,
      "next_action": true,
      "specific_value": true
    }
  }
}

The "primary_cta" string MUST be the human-readable label that matches the primary_action enum (e.g. "Refresh code now" for refresh_code, "Notify your co-host" for notify_cohost, "Contact Schlage support" for contact_support, "Replace battery in person" for replace_battery).

Return only the structured JSON output.`

export function buildAlertContext(property) {
  const p = property
  let issueType = 'low_battery'
  let currentValue = p.battery
  if (p.connectivity === 'Offline') { issueType = 'wifi_offline'; currentValue = '6h since last seen' }
  else if (p.codeSync === 'Pending') { issueType = 'sync_pending'; currentValue = 'awaiting push' }
  else if (p.battery <= 15) { issueType = 'critical_battery'; currentValue = p.battery }
  const severity = p.status === 'Offline' ? 'critical' : p.battery <= 15 ? 'critical' : p.battery <= 30 ? 'high' : 'medium'
  return {
    alert_id: `alert_${p.id}_${Date.now()}`,
    property: { name: p.name, address_short: p.address.split(',').slice(-2).join(',').trim() },
    lock: { name: p.lockName, model: p.lockModel.includes('Plus') ? 'Schlage Encode Plus' : 'Schlage Encode' },
    issue: { type: issueType, current_value: currentValue, duration_minutes: issueType === 'wifi_offline' ? 360 : null },
    check_in: { guest_label: p.nextCheckIn.guest, scheduled_iso: p.nextCheckIn.iso, hours_remaining: p.nextCheckIn.hoursAway },
    host_context: { alerts_in_last_24h: 0, preferred_channel: 'push', timezone: 'America/Los_Angeles' },
    severity,
  }
}

export async function generateAlertCopy(context) {
  const userMessage = `Input context:\n${JSON.stringify(context, null, 2)}`
  const reply = await callClaude(ALERT_COPY_SYSTEM_PROMPT, userMessage)
  const cleaned = reply.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim()
  return JSON.parse(cleaned)
}

export function expectedPrimaryAction(context) {
  const t = context?.issue?.type
  if (t === 'low_battery' || t === 'critical_battery') return 'replace_battery'
  if (t === 'wifi_offline') return 'notify_cohost'
  if (t === 'sync_pending' || t === 'sync_failed') return 'refresh_code'
  if (t === 'could_not_verify') return 'notify_cohost'
  return 'refresh_code'
}

export function validateAlertCopy(output, context) {
  const checks = {}
  const set = (k, label, pass, detail) => { checks[k] = { label, pass, detail } }

  // 1. Schema valid
  let schemaPass = false, schemaDetail = ''
  try {
    if (!output || typeof output !== 'object') throw new Error('output not an object')
    if (!output.sms?.body) throw new Error('sms.body missing')
    if (!output.push?.title || !output.push?.body) throw new Error('push.title or push.body missing')
    if (!output.in_app?.headline || !output.in_app?.body || !output.in_app?.primary_cta) throw new Error('in_app fields missing')
    schemaPass = true; schemaDetail = 'All required fields present'
  } catch (e) { schemaDetail = e.message }
  set('schema', 'Schema valid', schemaPass, schemaDetail)

  // 2. Metadata flags complete
  let metaPass = false, metaDetail = ''
  try {
    if (!output?.metadata?.elements_included) throw new Error('metadata.elements_included missing')
    const keys = ['property_name', 'failure_mode', 'time_remaining', 'next_action', 'specific_value']
    keys.forEach((k) => { if (typeof output.metadata.elements_included[k] !== 'boolean') throw new Error(`flag ${k} missing`) })
    metaPass = keys.every((k) => output.metadata.elements_included[k] === true)
    metaDetail = metaPass ? 'All 5 element flags = true' : 'One or more element flags = false'
  } catch (e) { metaDetail = e.message }
  set('metadata_flags', 'Metadata flags complete', metaPass, metaDetail)

  // 3. SMS within length
  const smsLen = (output?.sms?.body || '').length
  set('sms_length', 'SMS within 160 chars', smsLen <= 160 && smsLen > 0, `${smsLen}/160`)

  // 4. Push within length
  const ptLen = (output?.push?.title || '').length
  const pbLen = (output?.push?.body || '').length
  set('push_length', 'Push within 50 / 120 chars', ptLen <= 50 && ptLen > 0 && pbLen <= 120 && pbLen > 0, `title ${ptLen}/50 · body ${pbLen}/120`)

  // 5. In-app within length
  const hLen = (output?.in_app?.headline || '').length
  const bLen = (output?.in_app?.body || '').length
  const cLen = (output?.in_app?.primary_cta || '').length
  set('in_app_length', 'In-app within 80 / 280 / 30 chars', hLen <= 80 && hLen > 0 && bLen <= 280 && bLen > 0 && cLen <= 30 && cLen > 0, `headline ${hLen}/80 · body ${bLen}/280 · cta ${cLen}/30`)

  const blob = output?.in_app ? `${output.in_app.headline} ${output.in_app.body}`.toLowerCase() : ''
  const allCopy = [output?.sms?.body, output?.push?.title, output?.push?.body, output?.in_app?.headline, output?.in_app?.body, output?.in_app?.primary_cta].filter(Boolean).join(' ')

  // 6. Property + lock named in copy
  const propOk = blob.includes(context.property.name.toLowerCase())
  set('names_grounded', 'Property named in copy', propOk, propOk ? `Mentions "${context.property.name}"` : `Missing "${context.property.name}"`)

  // 7. Failure mode + specific value present
  const failOk = /battery|offline|sync|signal|wi-?fi|unreachable|low|critical/.test(blob)
  const valueOk = (typeof context.issue.current_value === 'number') ? blob.includes(String(context.issue.current_value)) : true
  set('failure_mode', 'Failure mode + value present', failOk && valueOk, `failure_keyword=${failOk}, value_in_copy=${valueOk}`)

  // 8. Time remaining + action verb present
  const timeOk = /hour|today|tomorrow|minute|pm|am|check-in|before/.test(blob)
  const actionOk = /refresh|notify|contact|view|swap|replace|push|check/.test(blob)
  set('time_action', 'Time remaining + action verb present', timeOk && actionOk, `time=${timeOk}, action=${actionOk}`)

  // 9. Hallucination guard
  const pcts = allCopy.match(/\b\d{1,3}%/g) || []
  const groundedTerms = [context.property.name, context.lock.name, context.check_in.guest_label, String(context.check_in.hours_remaining), String(context.issue.current_value)].map((s) => String(s).toLowerCase())
  const badPct = pcts.find((p) => { const n = p.replace('%', ''); return !groundedTerms.includes(n) && !groundedTerms.some((t) => t.includes(n)) })
  const banned = /lock issue detected/i.test(allCopy)
  const hallucPass = !badPct && !banned
  const hallucDetail = badPct ? `ungrounded percentage "${badPct}"` : banned ? 'banned generic phrase used' : 'No ungrounded facts or banned phrases'
  set('hallucination', 'No hallucinated facts', hallucPass, hallucDetail)

  // 10. Primary action valid
  const ACTIONS = ['refresh_code', 'notify_cohost', 'contact_support', 'replace_battery']
  const pa = output?.primary_action
  const expected = expectedPrimaryAction(context)
  const paPresent = ACTIONS.includes(pa)
  const paMatches = paPresent && pa === expected
  set('primary_action', 'Primary action valid', paMatches, paPresent ? (paMatches ? `${pa} (matches expected)` : `${pa} (expected ${expected})`) : `missing or unknown: ${JSON.stringify(pa)}`)

  const passed = Object.values(checks).every((c) => c.pass)
  return { passed, checks }
}

export function templatedFallback(context) {
  const c = context
  const issue = c.issue.type
  const hrs = c.check_in.hours_remaining
  let failPhrase = 'a health issue'
  if (issue === 'critical_battery' || issue === 'low_battery') failPhrase = `battery at ${c.issue.current_value}%`
  else if (issue === 'wifi_offline') failPhrase = 'Wi-Fi offline'
  else if (issue === 'sync_pending' || issue === 'sync_failed') failPhrase = 'code sync pending'

  const primary_action = expectedPrimaryAction(c)
  const ctaLabel = {
    refresh_code: 'Refresh code now',
    notify_cohost: 'Notify your co-host',
    contact_support: 'Contact Schlage support',
    replace_battery: 'Replace battery in person',
  }[primary_action]

  return {
    sms: { body: `${c.property.name} (${c.lock.name}): ${failPhrase}. ${c.check_in.guest_label} checks in in ${hrs}h. ${ctaLabel} in the app.` },
    push: {
      title: `${c.property.name}: ${failPhrase}`,
      body: `${c.check_in.guest_label} checks in in ${hrs}h. ${ctaLabel}.`,
    },
    in_app: {
      headline: `${c.property.name}: action needed before check-in`,
      body: `${c.lock.name} is showing ${failPhrase}. ${c.check_in.guest_label} checks in in ${hrs} hours. ${ctaLabel} to resolve.`,
      primary_cta: ctaLabel,
    },
    primary_action,
    metadata: {
      tone: c.severity === 'critical' ? 'urgent' : 'informative',
      elements_included: { property_name: true, failure_mode: true, time_remaining: true, next_action: true, specific_value: true },
    },
  }
}
