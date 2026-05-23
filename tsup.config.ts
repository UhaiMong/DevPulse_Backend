import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"], // CommonJS output — no extension issues
  outDir: "dist",
  clean: true, // cleans dist before each build
  sourcemap: true,
  minify: false,
});
