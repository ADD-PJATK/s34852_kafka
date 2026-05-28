/**
 * stream → export → anonymize → out/
 * Phase B: complete anonymizer wiring so tests pass.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOCK_BASE = process.env.MOCK_BASE ?? "http://127.0.0.1:4000";
const TICKER = process.env.PIPELINE_TICKER ?? "ACME";
const TICK_COUNT = Number(process.env.PIPELINE_TICK_COUNT ?? 3);

const exportDir = path.join(__dirname, "export");
const outDir = path.join(__dirname, "out");
const exportFile = path.join(exportDir, `${TICKER.toLowerCase()}-stream.ndjson`);

fs.mkdirSync(exportDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

async function collectStream() {
  const url = `${MOCK_BASE}/api/stream?ticker=${encodeURIComponent(TICKER)}`;
  const res = await fetch(url, { headers: { Accept: "text/event-stream" } });
  if (!res.ok) {
    throw new Error(`Stream failed: ${res.status} ${await res.text()}`);
  }

  const lines = [];
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (lines.length < TICK_COUNT) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const block of parts) {
      const dataLine = block.split("\n").find((l) => l.startsWith("data: "));
      if (!dataLine) continue;
      lines.push(dataLine.slice(6));
      if (lines.length >= TICK_COUNT) break;
    }
  }

  try {
    reader.cancel();
  } catch {
    // ignore
  }

  if (lines.length < TICK_COUNT) {
    throw new Error(`Expected ${TICK_COUNT} ticks, got ${lines.length}`);
  }

  fs.writeFileSync(exportFile, `${lines.join("\n")}\n`, "utf8");
  return exportFile;
}

function runAnonymizer(inputPath) {
  const repoRoot = path.join(__dirname, "..", "..");
  const anonymizerDir = path.join(repoRoot, "anonymizer");
  const script = path.join(anonymizerDir, "anonymize.py");

  if (!fs.existsSync(script)) {
    throw new Error(
      "anonymizer/anonymize.py missing. Restore with: git checkout backup -- anonymizer",
    );
  }

  const outFile = path.join(outDir, path.basename(inputPath));
  const result = spawnSync(
    process.env.PYTHON ?? "python",
    [script, "--input", inputPath, "--output", outFile],
    { encoding: "utf8", cwd: anonymizerDir },
  );

  if (result.status !== 0) {
    throw new Error(
      `Anonymizer failed (${result.status}): ${result.stderr || result.stdout}`,
    );
  }

  return outFile;
}

const input = await collectStream();
const output = runAnonymizer(input);
// eslint-disable-next-line no-console
console.log(`Pipeline done: ${output}`);
