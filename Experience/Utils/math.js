export function lerp (start, end, amount) {
  return (1 - amount) * start + amount * end
}

export function clamp (number, min, max) {
  return Math.max(min, Math.min(number, max))
}
