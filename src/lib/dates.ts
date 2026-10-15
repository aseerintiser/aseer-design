/** "Sep 2023 – Jul 2024 (Convay tenure)" -> "2023–2024"; "June 2026" -> "2026". */
export function yearsFrom(duration: string) {
  const years = [...new Set(duration.match(/\b(19|20)\d{2}\b/g) ?? [])];
  return years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : (years[0] ?? "");
}
