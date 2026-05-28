import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// BUG (Phase A): wrong directory — export lives under pipeline/export/
const exportDir = path.join(__dirname, "..", "export");

test("pipeline wrote NDJSON export for ACME", () => {
  const file = path.join(exportDir, "acme-stream.ndjson");
  assert.ok(fs.existsSync(file), `missing export file: ${file}`);
});
