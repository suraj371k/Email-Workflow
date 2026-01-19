

export function getHeader(
  headers: any[] | undefined,
  name: string
): string {
  if (!Array.isArray(headers)) return ""

  const target = name.toLowerCase()

  const header = headers.find(
    (h) =>
      h &&
      typeof h.name === "string" &&
      h.name.toLowerCase() === target
  )

  return typeof header?.value === "string" ? header.value : ""
}

