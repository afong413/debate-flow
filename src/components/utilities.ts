export function firstNull(a: Array<any>) {
  const i = a.findIndex((x) => x === null)
  if (i !== -1) return i
  return a.length
}
