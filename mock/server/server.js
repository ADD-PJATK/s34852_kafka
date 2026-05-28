import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(__dirname, "..", "fixtures");

const PORT = Number(process.env.MOCK_PORT ?? 4000);
const TICK_INTERVAL_MS = Number(process.env.TICK_INTERVAL_MS ?? 2000);

const tickers = JSON.parse(
  fs.readFileSync(path.join(FIXTURES, "tickers.json"), "utf8"),
);
const seedTicks = JSON.parse(
  fs.readFileSync(path.join(FIXTURES, "seed-ticks.json"), "utf8"),
);

/** @type {Map<string, object>} */
const latestByTicker = new Map();
for (const row of seedTicks) {
  latestByTicker.set(row.ticker, { ...row });
}

const app = express();

app.get("/api/tickers", (_req, res) => {
  res.json(tickers);
});

app.get("/api/latest", (req, res) => {
  const ticker = String(req.query.ticker ?? "").trim().toUpperCase();
  if (!ticker) {
    res.status(400).json({ error: "Missing required query param: ticker" });
    return;
  }
  const latest = latestByTicker.get(ticker);
  if (!latest) {
    res.status(404).json({ error: "Unknown ticker", ticker });
    return;
  }
  res.json(latest);
});

app.get("/api/stream", (req, res) => {
  const ticker = String(req.query.ticker ?? "").trim().toUpperCase();
  if (!ticker) {
    res.status(400).json({ error: "Missing required query param: ticker" });
    return;
  }
  if (!tickers.some((t) => t.ticker === ticker)) {
    res.status(404).json({ error: "Unknown ticker", ticker });
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  let base = latestByTicker.get(ticker)?.price ?? 100;
  let n = 0;

  const sendTick = () => {
    n += 1;
    const drift = (Math.random() - 0.5) * 0.8;
    base = Math.round((base + drift) * 100) / 100;
    const ts = new Date().toISOString();
    const payload = {
      ticker,
      ts,
      price: base,
      trader_email: `desk+${ticker.toLowerCase()}@fictional.example`,
      operator_name: `Desk ${ticker} (fictional)`,
      comment: `mock tick #${n}`,
    };
    latestByTicker.set(ticker, payload);
    res.write(`event: tick\ndata: ${JSON.stringify(payload)}\n\n`);
  };

  sendTick();
  const timer = setInterval(sendTick, TICK_INTERVAL_MS);

  req.on("close", () => {
    clearInterval(timer);
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock stock API on http://localhost:${PORT}`);
});
