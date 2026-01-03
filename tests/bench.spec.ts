import { describe, expect, it } from "vitest";
import { slugen } from "../src";

describe("slugen – benchmark", () => {
  it("generates 10k slugs under acceptable time", () => {
    const input = "Straße Español Crème brûlée 123 İstanbul !!! &*%";
    const ITERATIONS = 10_000;

    const start = performance.now();

    for (let i = 0; i < ITERATIONS; i++) {
      slugen(input, {
        locale: ["tr", "de", "es", "fr"],
      });
    }

    const end = performance.now();
    const duration = end - start;

    console.log(`⚡ ${ITERATIONS} slugs in ${duration.toFixed(2)}ms`);

    expect(duration).toBeLessThan(200);
  });
});
