const $ticker = document.getElementById("ticker");
const $status = document.getElementById("status");
const $sym = document.getElementById("sym");
const $price = document.getElementById("price");
const $ts = document.getElementById("ts");

let es;

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
  const ticker = $ticker.value;
  $status.textContent = `Streaming ${ticker}…`;
  $sym.textContent = ticker;
  es = new EventSource(`/api/stream?ticker=${encodeURIComponent(ticker)}`);
  es.addEventListener("tick", (ev) => {
    const row = JSON.parse(ev.data);
    $price.textContent = Number(row.price).toFixed(2);
    $ts.textContent = row.ts;
  });
  es.addEventListener("error", () => {
    $status.textContent = "Stream error";
  });
}

loadTickers().catch((e) => {
  $status.textContent = String(e);
});
