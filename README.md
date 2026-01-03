# slugen

A modern, fast slug generator for JavaScript and TypeScript.

Generate URL-friendly slugs, usernames, SEO-friendly links, or safely convert text into clean identifiers.


## Features

- **Multi-locale support** — de, fr, tr, es, and more
- **Accurate normalization** of accented and language-specific characters
- **Smart symbol handling** with semantic replacements instead of blind removal
- **High performance**, suitable for batch and large-scale processing
- **Customizable separators** (`-`, `_`, `.`)
- **Deterministic output** with comprehensive test coverage


## Installation

```bash
npm install slugen
```
or

```bash
pnpm add slugen
```

## Quick Start

```ts
import { slugen } from "slugen";

slugen("Hello World");
// → "hello-world"

slugen("Istanbul's Best Coffee!");
// → "istanbuls-best-coffee"
```

## With Options
```ts
import { slugen } from "slugen";

slugen("Hello World", {
  locale: "fr", // or ["fr", "de"]
  separator: "-",
  lowercase: true,
  symbols: true,
  customReplacements: {
    "&": "and",
  },
});
// hello-world
```

## Separator

The default separator is -.
You can also use `_` or `.`

```ts
slugen("Hello World", { separator: "-" });
// hello-world
slugen("Hello World", { separator: "_" });
// hello_world
slugen("Hello World", { separator: "." });
// hello.world
```
The separator must be a single character.

## Locale Support

By default, slugen uses Unicode normalization and removes diacritics.
You can optionally provide a locale for better language-specific handling.

```ts
import { slugen } from "slugen";

slugen("Café français", { locale: "fr" });
// → "cafe-francais"
slugen("Español México", { locale: "es" });
// → "espanol-mexico"
slugen("İstanbul Boğazı", { locale: "tr" });
// istanbul-bogazi
slugen("Straße Größe", { locale: "de" });
// strasse-grosse

```
### Multiple locales (merged)
```ts
slugen("İstanbul Straße Español", { locale: ["tr", "de", "es"]});
// istanbul-strasse-espanol
```
Locales are applied in order and safely merged.

## Symbol Handling

slugen categorizes symbols into three groups:

### Examples:
```ts
slugen("foo & bar"); 
// foo-and-bar
slugen("email@test.com");
// email-at-test-com
slugen("50€");
// 50-euro
slugen("foo & bar");
// foo-and-bar
slugen("100$ price");
// 100-dollar-price
slugen("50% off");
// 50-percent-off
```

### Disable Symbols
```ts
slugen("foo & bar", { symbols: false });
// foo-bar
```

## Custom Replacements

```ts
slugen("React & Vue", {
  customReplacements: {
    "&": "and",
    "React": "react-js"
  }
});
// react-js-and-vue

slugen("C++ Programming", {
  customReplacements: {
    "++": "plus-plus"
  }
});
// c-plus-plus-programming
```


## Real-World Examples
```ts
slugen("How to Learn JavaScript in 2025?");
// how-to-learn-javascript-in-2025
slugen("React vs Vue: Which is Better?");
// react-vs-vue-which-is-better
slugen("iPhone 15 Pro Max");
// iphone-15-pro-max
slugen("Samsung 55\" 4K Smart TV");
// samsung-55-4k-smart-tv
```

### Usernames:

```ts
slugen("John Doe", { separator: "_" });
// john_doe

slugen("jane.smith@example", { separator: "_" });
// jane_smith_at_example
```

### Filenames:

```ts
slugen("Project Report 2024.pdf", { separator: "_" });
// project_report_2024_pdf
```


## API Reference

### ``slugen(text, options?)``

Generates a slug from the given text.

**Parameters:**
- `text` (string) - Text to convert into a slug
- `options` (object, optional) - Configuration options

**Options:**

| Option               | Type                     | Default     | Description                                     |
| -------------------- | ------------------------ | ----------- | ----------------------------------------------- |
| `locale`             | `string \| string[]`     | `undefined` | Language support (e.g., `"tr"`, `"de"`, `"fr"`) |
| `separator`          | `"-" \| "_" \| "."`      | `"-"`       | Character to separate words                     |
| `lowercase`          | `boolean`                | `true`      | Convert to lowercase                            |
| `symbols`            | `boolean`                | `true`      | Enable symbol normalization                     |
| `customReplacements` | `Record<string, string>` | `{}`        | Custom character replacements                   |

**Returns:** `string` - Generated slug


## Design Notes

- ``applySymbols`` only normalizes text; it does not decide slug structure
- A single regex pass handles final slug normalization
- Locale and separator behavior is deterministic
- Minimal API surface, easy to extend


## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.


## License
MIT

