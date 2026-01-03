import { describe, it, expect, afterEach, afterAll } from "vitest";
import { slugen } from "../src";

/*  */
const results: { input: string; output: string }[] = [];

function run(input: string, options?: any) {
  const output = slugen(input, options);
  results.push({ input, output });
  return output;
}

///
afterAll(() => {
  console.log("\nSlug results:");
  console.table(results);
});

///
describe("slugen – basic behavior", () => {
  it("creates a basic slug", () => {
    expect(run("Hello World")).toBe("hello-world");
  });

  it("normalizes whitespace", () => {
    expect(run("   Hello     World   ")).toBe("hello-world");
  });

  it("lowercases by default", () => {
    expect(run("HELLO World")).toBe("hello-world");
  });

  it("returns empty string for empty input", () => {
    expect(run("")).toBe("");
  });
});

describe("slugen -  separators", () => {
  it("supports dot separator", () => {
    expect(run("Hello World", { separator: "." })).toBe("hello.world");
  });

  it("supports underscore separator", () => {
    expect(run("Hello World", { separator: "_" })).toBe("hello_world");
  });
});

describe("slugen – symbols handling", () => {
  it("replaces common symbols", () => {
    expect(run("foo & bar")).toBe("foo-and-bar");
    expect(run("A | B")).toBe("a-or-b");
    expect(run("@user #tag **bold**")).toBe("at-user-tag-bold");
    expect(run("email@test.com")).toBe("email-at-test-com");
  });

  it("handles currency symbols", () => {
    expect(run("100$")).toBe("100-dollar");
    expect(run("50€")).toBe("50-euro");
    expect(run("20₺")).toBe("20-lira");
  });

  it("removes punctuation and emojis", () => {
    expect(run("Hello!!! 😄 World???")).toBe("hello-world");
  });

  it("can disable symbol replacement", () => {
    expect(run("foo & bar", { symbols: false })).toBe("foo-bar");
  });
});

describe("slugen – locale support", () => {
  it("handles Turkish characters", () => {
    expect(run("İstanbul Boğazı", { locale: "tr" })).toBe("istanbul-bogazi");
  });

  it("handles German characters", () => {
    expect(run("Straße Größe", { locale: "de" })).toBe("strasse-grosse");
  });

  it("handles French accents", () => {
    expect(run("Crème brûlée déjà", { locale: "fr" })).toBe("creme-brulee-deja");
  });

  it("handles Spanish characters", () => {
    expect(run("Español niño año", { locale: "es" })).toBe("espanol-nino-ano");
  });

  it("merges multiple locales", () => {
    expect(
      slugen("İstanbul Straße Español", {
        locale: ["tr", "de", "es"],
      })
    ).toBe("istanbul-strasse-espanol");
  });
});

describe("slugen – options", () => {
  it("supports custom separator", () => {
    expect(run("Hello World", { separator: "_" })).toBe("hello_world");
  });

  it("supports custom replacements", () => {
    expect(
      slugen("foo & bar", {
        customReplacements: { "&": "ve" },
      })
    ).toBe("foo-ve-bar");
  });

  it("can disable lowercase", () => {
    expect(run("Hello World", { lowercase: false })).toBe("Hello-World");
  });
});
