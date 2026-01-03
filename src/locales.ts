type LocaleMap = Record<string, string>;

/**
 * Locale definitions
 */
export const locales: Record<string, LocaleMap> = {
  de: {
    Ä: "a",
    ä: "a",
    Ö: "o",
    ö: "o",
    Ü: "u",
    ü: "u",
    ß: "ss",
  },

  fr: {
    À: "a",
    Á: "a",
    Â: "a",
    Ã: "a",
    Ä: "a",
    Å: "a",
    à: "a",
    á: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    Ç: "c",
    ç: "c",
    È: "e",
    É: "e",
    Ê: "e",
    Ë: "e",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    Œ: "oe",
    œ: "oe",
  },

  es: {
    Ñ: "n",
    ñ: "n",
  },

  tr: {
    İ: "i",
    I: "i",
    ı: "i",
    Ş: "s",
    ş: "s",
    Ğ: "g",
    ğ: "g",
    Ö: "o",
    ö: "o",
    Ü: "u",
    ü: "u",
    Ç: "c",
    ç: "c",
  },

  pl: {
    Ł: "l",
    ł: "l",
    Ś: "s",
    ś: "s",
    Ż: "z",
    ż: "z",
  },

  en: {},
};

/**
 * Cache: localeKey -> { map, regex }
 */
const localeCache = new Map<string, { map: LocaleMap; regex: RegExp }>();

/**
 * Merge multiple locales into a single map
 */
function mergeLocales(localeKeys: string[]): LocaleMap {
  const merged: LocaleMap = {};

  for (const key of localeKeys) {
    const locale = locales[key];
    if (!locale) continue;
    Object.assign(merged, locale);
  }

  return merged;
}

/**
 * Apply locale replacements
 *
 * Supports:
 *  - 'fr'
 *  - ['fr', 'de']
 */
export function applyLocale(text: string, locale?: string | string[]): string {
  if (!locale) return text;

  const keys = Array.isArray(locale) ? locale : [locale];
  const cacheKey = keys.sort().join("+");

  let cached = localeCache.get(cacheKey);

  if (!cached) {
    const map = mergeLocales(keys);

    if (Object.keys(map).length === 0) {
      localeCache.set(cacheKey, { map, regex: /$^/ });
      return text;
    }

    const pattern = new RegExp(`[${Object.keys(map).join("")}]`, "g");

    cached = { map, regex: pattern };
    localeCache.set(cacheKey, cached);
  }

  return text.replace(cached.regex, (char) => cached!.map[char] ?? char);
}
