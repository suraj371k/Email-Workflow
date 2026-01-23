
export function getHeader(headers: any[] | undefined, name: string): string {
  if (!Array.isArray(headers)) return "";

  const target = name.toLowerCase();

  const header = headers.find(
    (h) => h && typeof h.name === "string" && h.name.toLowerCase() === target,
  );

  return typeof header?.value === "string" ? header.value : "";
}

export function parseFrom(from: string) {
  const name = from.split("<")[0]?.replace(/"/g, "").trim();
  const email = from.match(/<(.+?)>/)?.[1];

  return {
    name: name || email || "Unknown",
    email: email || "",
  };
}

