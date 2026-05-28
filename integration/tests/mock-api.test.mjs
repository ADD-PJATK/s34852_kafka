import test from "node:test";
import assert from "node:assert/strict";

const MOCK_BASE = process.env.MOCK_BASE ?? "http://127.0.0.1:4000";

test("GET /api/tickers returns catalog", async () => {
  const res = await fetch(`${MOCK_BASE}/api/tickers`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  assert.ok(body.some((t) => t.ticker === "ACME"));
});

test("GET /api/latest returns price for ACME", async () => {
  const res = await fetch(`${MOCK_BASE}/api/latest?ticker=ACME`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ticker, "ACME");
  assert.equal(typeof body.price, "number");
});
