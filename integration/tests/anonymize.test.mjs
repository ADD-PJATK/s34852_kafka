import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "pipeline", "out");
const SENSITIVE = [
  "trader_email",
  "operator_name",
  "comment",
  "analyst_email",
  "employee_id",
  "internal_note",
];

test("pipeline out/ has no fictional PII fields", async () => {
  if (!fs.existsSync(outDir)) {
    assert.fail(
      "integration/pipeline/out/ missing — run pipeline after Phase B fixes",
    );
  }

  const files = fs.readdirSync(outDir).filter((f) => f.endsWith(".ndjson"));
  assert.ok(files.length > 0, "expected at least one .ndjson in out/");

  for (const file of files) {
    const text = fs.readFileSync(path.join(outDir, file), "utf8");
    for (const line of text.split("\n").filter(Boolean)) {
      const row = JSON.parse(line);
      for (const key of SENSITIVE) {
        assert.equal(
          row[key],
          undefined,
          `${file} still contains sensitive field: ${key}`,
        );
      }
    }
  }
});
