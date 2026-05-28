const $ticker = document.getElementById("ticker");
const $status = document.getElementById("status");
const $sym = document.getElementById("sym");
const $price = document.getElementById("price");
const $ts = document.getElementById("ts");
const $exportJson = document.getElementById("export-json");
const $exportCsv = document.getElementById("export-csv");

const BUFFER_N = 20;
const buffer = [];

let es;

function pushTick(row) {
  buffer.push(row);
  if (buffer.length > BUFFER_N) buffer.shift();
}

async function loadTickers() {
  const res = await fetch("/api/tickers");
  const list = await res.json();
  $ticker.innerHTML = list
    .map((t) => `<option value="${t.ticker}">${t.ticker} — ${t.company}</option>`)
    .join("");
  $ticker.addEventListener("change", connect);
  if (list.length) connect();
}

function connect() {
  if (es) es.close();
  buffer.length = 0;
  const ticker = $ticker.value;
  $status.textContent = `Streaming ${ticker}… (buffer: last ${BUFFER_N})`;
  $sym.textContent = ticker;
  es = new EventSource(`/api/stream?ticker=${encodeURIComponent(ticker)}`);
  es.addEventListener("tick", (ev) => {
    const row = JSON.parse(ev.data);
    pushTick(row);
    $price.textContent = Number(row.price).toFixed(2);
    $ts.textContent = row.ts;
  });
  es.addEventListener("error", () => {
    $status.textContent = "Stream error";
  });
}

$exportJson?.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(buffer, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ticks-buffer.json";
  a.click();
});

// BUG (Phase A): semicolon delimiter — not valid RFC CSV for spreadsheets
$exportCsv?.addEventListener("click", () => {
  const header = "ticker;ts;price;trader_email;operator_name;comment";
  const rows = buffer.map(
    (r) =>
      `${r.ticker};${r.ts};${r.price};${r.trader_email ?? ""};${r.operator_name ?? ""};${r.comment ?? ""}`,
  );
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ticks-buffer.csv";
  a.click();
});

loadTickers().catch((e) => {
  $status.textContent = String(e);
});
