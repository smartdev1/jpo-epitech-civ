/** Proof-of-scan token: minted only by the in-app QR scanner, never derivable from a guessed URL. */
export function generateScanToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}
