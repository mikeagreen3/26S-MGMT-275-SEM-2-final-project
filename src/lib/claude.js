const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export async function callClaude(systemPrompt, userMessage) {
  if (!API_KEY) {
    throw new Error(
      'VITE_ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.'
    )
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Anthropic API error ${response.status}: ${errorText}`)
  }

  const data = await response.json()
  return data.content[0].text
}
