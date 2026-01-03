import { SlugenOptions } from "./types";
import { applyLocale } from "./locales";
import { applySymbols } from "./symbols";

function escapeRegex(char: string) {
  return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function slugen(input: string, options: SlugenOptions = {}): string {
  if (!input) return "";

  const separator = options.separator ?? "-";
  const safeSeparator = escapeRegex(separator);
  let text = input;

  // Symbols (default true)
  if (options.symbols !== false) {
    text = applySymbols(text, options.customReplacements);
  }

  // Locale
  text = applyLocale(text, options.locale);

  // Normalize & remove diacritics
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace non-alphanumeric with separator
  text = text.replace(/[^a-zA-Z0-9]+/g, separator);

  // Trim separator (SAFE)
  text = text.replace(new RegExp(`^${safeSeparator}+|${safeSeparator}+$`, "g"), "");

  // Lowercase (default true)
  if (options.lowercase !== false) {
    text = text.toLowerCase();
  }

  return text;
}
