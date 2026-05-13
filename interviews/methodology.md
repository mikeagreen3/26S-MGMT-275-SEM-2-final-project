---
type: methodology
domain: mba
course: mgmt275-pm-delivery
deliverable: ux-eval-appendix
status: draft
created: 2026-05-13
updated: 2026-05-13
---

# User Research Methodology

> Documents how the 10 simulated user interviews backing this appendix were generated, run, and synthesized. This file feeds the Method section of `ux-eval-appendix.md`. Written to be transparent enough that a grader can see exactly what was done and why.

## Overview

Group 3 conducted **10 AI-simulated user interviews** with synthetic STR-host personas, in lieu of recruiting live hosts. The methodology was explicitly approved by the TA on 2026-05-11 (`_assignment-refs/faculty-correspondence.md` Inbound v1): "you can get creative with how you build user understanding: synthesize insights from online discussions, content from target users, or construct informed personas based on publicly available user discourse." Live interviews were not required.

The pipeline has four stages:

1. **Source corpus assembly** — 25-30 public sources loaded into NotebookLM as the grounding layer.
2. **Persona generation** — NotebookLM prompted to produce 10 distinct personas, each grounded in specific source quotes.
3. **Interview execution** — each persona run through the shared interview guide (`guide.md`) in a Claude conversation, with NotebookLM as the source-lookup backend when verbatim quotes were needed.
4. **Synthesis** — anonymized per-persona summaries, then cross-cutting findings rolled into `ux-eval-appendix.md`.

The principle throughout: **grounded, not invented**. Every persona claim and every cited quote must trace back to source material. Where NotebookLM or Claude generated content with no source backing, it was flagged and either regenerated or excluded.

## Stage 1 — Source corpus assembly

Full corpus inventory and selection rules: see [`source-corpus.md`](./source-corpus.md). Summary:

| Tier | Source type | Count | Purpose |
|---|---|---|---|
| 1 | Reddit threads (r/airbnb_hosts, r/vrbohosts) | 12 | Primary user-voice data |
| 2 | STR host operations blogs | 6-8 | Workflow vocabulary, persona detail |
| 3 | Smart lock product reviews (Amazon, app stores) | 10-12 | Brand-specific texture and complaints |
| 4 | Allegion 10-K + earnings transcripts | 2-3 | Company-strategic grounding |
| 5 | Industry context (optional) | 2-3 | Market-size grounding only |

Excluded by syllabus rule: Wikipedia, Statista. Used as raw user-voice evidence (not as PR-FAQ citations): Reddit threads. Acceptable for both: SEC filings, earnings calls, product reviews.

## Stage 2 — Persona generation in NotebookLM

### Setup

Create a NotebookLM notebook, then load the corpus via the Sources panel. NotebookLM accepts:

- PDFs (drag-and-drop)
- Web URLs (paste; NotebookLM fetches)
- Pasted text (for content that won't import cleanly)

NotebookLM caps at 50 sources per notebook; the working corpus was 25-30.

### Generation prompt

Open the chat panel. The prompt used to generate the 10-persona set:

```
Generate 10 distinct short-term rental host personas, grounded entirely
in the source corpus. Each persona must vary across these 5 axes so the
set has range:

1. Property count: 1 / 2-4 / 5+
2. Pain dominance: Pain A (lock failure at check-in) / Pain B (manual
   code management) / both
3. Tech savviness: low / medium / high
4. Lock brand: Schlage Encode, Yale Assure, August, Eufy, or mechanical
5. Operating model: solo / with cleaner / with PM service

For each persona, give me:

- Letter and short descriptor (e.g., "Host A — remote single-property")
- Profile: properties (count, type, locations), years hosting, lock
  brand(s), tech savviness, operating model
- Top 3 pain points, each with a verbatim quote from a specific source
  (cite the source title)
- 2-3 sentence background story synthesized from the sources, no
  inventions
- One thing this persona would PUSH BACK on if a Schlage rep tried to
  sell them an AI access concierge

Hard rules:
- Every pain point must trace to a specific source quote. If you can't
  ground it, don't include it.
- Personas must sound different. If two of them sound the same, redo
  one of them.
- No pure invention. If a detail isn't in the corpus, leave it out.
```

### Verification

After generation, two spot-checks:

1. **Distinctness check.** Read any two personas back-to-back. If they sound alike, prompt NotebookLM to regenerate one with a sharper differentiator drawn from the corpus.
2. **Grounding check.** Pick 2-3 personas at random. For each, select one verbatim quote and ask NotebookLM: "Show me the original passage for [quote]." If NotebookLM cannot surface the source, the quote was hallucinated. Flag the persona for regeneration.

### Output

NotebookLM does not have a clean export. Two viable paths:

- **Copy from chat output**, paste each persona into its own file at `final-project/interviews/personas/host-{letter}-{descriptor}.md` with frontmatter (`type: persona`, `status: synthetic`, `source-notebook: <NotebookLM URL>`).
- **Save to note**, then copy from there into the repo.

## Stage 3 — Interview execution

Each persona was run through the shared interview guide (`guide.md`) in a fresh Claude conversation. Per interview:

1. Open a new Claude conversation.
2. Paste the roleplay instructions (top of `guide.md`).
3. Paste the persona profile (or attach the NotebookLM persona text).
4. Run the guide section by section. Wait for the persona's response before moving on. Ask follow-up probes when something interesting surfaces; don't just plow through.
5. When the persona needs to ground a claim in real experience, request `[source-lookup: <query>]` from NotebookLM and paste the result back into Claude.
6. Save the full transcript to `final-project/interviews/raw/host-{letter}-transcript.md` (gitignored, contains the full persona backstory).
7. Write the anonymized synthesis to `final-project/interviews/host-{letter}-{descriptor}.md` (committed, public-repo safe).

Quality bar per transcript (from `guide.md`):

- At least one verbatim source-grounded quote per major theme
- Distinct voice from other personas
- Persona stays in role
- 1,500-3,000 words per transcript
- Captured surprises and pushback (not just agreement)

## Stage 4 — Synthesis

For each persona, the per-persona file includes:

- Anonymized profile (no specific properties or addresses)
- Top 3 pains
- Reactions to each capability tested (pre-arrival check, NL scheduling, cleaner rotation, anti-goals)
- Standout quotes
- Willingness-to-pay signal from the Van Westendorp probe

Cross-cutting synthesis rolled into `ux-eval-appendix.md`:

- Which features got the strongest positive signal across personas
- Which got pushback, and from which segments
- Where personas diverged (this is the signal, not the noise)
- Persona clustering (who looks like whom)
- JTBD layer mapping (functional, emotional, social)
- Implications for the prototype and PR-FAQ

## Limitations

This methodology has real trade-offs against live recruiting, and the appendix needs to call them out honestly:

1. **No real-time pushback from a stranger.** A live interviewee will redirect a bad question, give a non-sequitur answer, or correct a misread of the product. A synthetic persona stays inside the prompt's framing. We mitigated this by deliberately asking provocative anti-goal questions and by instructing Claude to push back where the persona would push back. We can't fully eliminate it.
2. **No body language, tone, hesitation.** Live interviews give signals (a long pause, a sigh, a tonal shift on price) that the transcript-only format cannot capture. Anything we infer about emotional intensity from synthetic transcripts is bounded.
3. **No recruiting bias, but a different bias.** Live recruiting biases toward hosts who self-select into research; synthetic biases toward hosts who post online (the source corpus is Reddit-heavy). Online hosts skew more tech-engaged, more vocal about pain, and arguably more multi-property than the average STR host. We named this in persona variation but can't fully remove it.
4. **Model bias.** Claude has its own behavioral tendencies (agreeableness, pattern-completion). Even with explicit "push back" instructions, a synthetic persona may converge toward the product framing more than a real host would.
5. **Grounding is necessary but not sufficient.** A persona who cites real quotes can still construct a plausible-but-incorrect synthesis of what those quotes imply about willingness to pay or feature priority.

## What we would do differently in production research

If this were a real Schlage product validation, not a class project, we would:

- Run 6-8 live host interviews to triangulate against the synthetic set
- Reach hosts outside the Reddit corpus (Airbnb host Facebook groups, Hospitable user forum, local STR meetups) to address the Reddit-bias problem
- Add a quantitative survey (n=50-100) after qualitative round to test the Van Westendorp price band and feature preferences at scale
- Run prototype clickthrough sessions with 4-6 hosts, not just discussion, to capture observed-behavior data we can't get from a guide-driven interview

These are documented as next-step research, not as gaps in this submission.

## File references

| File | What it contains |
|---|---|
| `source-corpus.md` | Full corpus inventory and selection rules |
| `guide.md` | Shared interview guide (TA-approved 3-block structure: problem validation, solution comprehension, usage intent) |
| `personas/host-{a-j}-*.md` | 10 synthetic persona profiles |
| `raw/host-{a-j}-transcript.md` | Full simulated interview transcripts (gitignored) |
| `host-{a-j}-*.md` | Anonymized per-persona synthesis (committed) |
| `../ux-eval-appendix.md` | Cross-cutting findings + Method section (pulls from this file) |
| `../_assignment-refs/faculty-correspondence.md` | TA approval of the methodology |
