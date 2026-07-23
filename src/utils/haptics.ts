export function vibrateError(): void {
  navigator.vibrate?.([60, 40, 60])
}

export function vibrateSuccess(): void {
  navigator.vibrate?.(80)
}
