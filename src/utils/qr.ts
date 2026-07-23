/** Extracts a checkpoint number from any reasonable QR payload: full URL, path, or bare number. */
export function parseCheckpoint(rawText: string): number | null {
  const text = rawText.trim()
  const match = text.match(/checkpoint\/?(\d+)/i) ?? text.match(/(\d+)\s*$/)
  if (!match) return null
  const value = parseInt(match[1]!, 10)
  return Number.isFinite(value) ? value : null
}

export function checkpointUrl(step: number): string {
  const code = step.toString().padStart(3, '0')
  return `${window.location.origin}${import.meta.env.BASE_URL}checkpoint/${code}`
}
