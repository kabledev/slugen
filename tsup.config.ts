import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  target: "es2024",
  outDir: "dist",
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [],
});
