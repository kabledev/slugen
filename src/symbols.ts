/**
 * Common symbols and their slug-friendly replacements
 * Policy:
 * - semantic symbols => " word "
 * - separators => " "
 * - noise => ""
 */

export const symbols: Record<string, string> = {
  // Logical / textual (semantic)
  "&": " and ",
  "|": " or ",
  "@": " at ",
  "%": " percent ",
  "+": " plus ",
  "=": " equals ",

  // Currency (semantic)
  $: " dollar ",
  "€": " euro ",
  "£": " pound ",
  "₺": " lira ",
  "¥": " yen ",
  "₹": " rupee ",

  // Separators
  ".": " ",
  "/": " ",
  "\\": " ",
  _: " ",

  // Noise (strip)
  "<": "",
  ">": "",
  "~": "",
  "^": "",
  "?": "",
  "!": "",
  ",": "",
  ":": "",
  ";": "",
  "'": "",
  '"': "",
  "`": "",
  "*": "",
  "#": "",
  "(": "",
  ")": "",
  "[": "",
  "]": "",
  "{": "",
  "}": "",
};

/** Escape regex special chars safely */
const escapeRegex = (char: string) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const BASE_SYMBOL_REGEX = new RegExp(`[${Object.keys(symbols).map(escapeRegex).join("")}]`, "g");

export function applySymbols(text: string, custom?: Record<string, string>) {
  const map = custom ? { ...symbols, ...custom } : symbols;
  const regex = map === symbols ? BASE_SYMBOL_REGEX : new RegExp(`[${Object.keys(map).map(escapeRegex).join("")}]`, "g");

  return text.replace(regex, (char) => map[char] ?? "");
}
