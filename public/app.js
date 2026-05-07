const CATALOG = [
  { ticker: "ACME", company: "ACME Corp." },
  { ticker: "ALFA", company: "Alfa Technologies" },
  { ticker: "BETA", company: "Beta Retail Group" },
  { ticker: "CASH", company: "CashBank" },
  { ticker: "CLOUD", company: "CloudNine" },
  { ticker: "COAL", company: "Coal Energy" },
  { ticker: "COPR", company: "Copper Mining Co." },
  { ticker: "DATA", company: "DataWorks" },
  { ticker: "DEVS", company: "DevStudio" },
  { ticker: "DRON", company: "Dronix" },
  { ticker: "ECO", company: "EcoPower" },
  { ticker: "EDU", company: "EduNext" },
  { ticker: "ENRG", company: "Energo" },
  { ticker: "FARM", company: "FarmFoods" },
  { ticker: "FINX", company: "FinX" },
  { ticker: "FOOD", company: "FoodBox" },
  { ticker: "FUEL", company: "FuelOne" },
  { ticker: "GAME", company: "GameForge" },
  { ticker: "GRIN", company: "GreenInvest" },
  { ticker: "HEAL", company: "HealTech" },
  { ticker: "HOME", company: "HomeBuild" },
  { ticker: "HYPE", company: "HypeMedia" },
  { ticker: "INSR", company: "InsureCo" },
  { ticker: "IOT", company: "IoTSystems" },
  { ticker: "JET", company: "JetLogistics" },
  { ticker: "LABS", company: "LabsResearch" },
  { ticker: "LEND", company: "Lendify" },
  { ticker: "LOGI", company: "LogiWare" },
  { ticker: "MALL", company: "Mall Retail" },
  { ticker: "MEDI", company: "MediCare" },
  { ticker: "META", company: "MetaCom" },
  { ticker: "MOBI", company: "MobiTel" },
  { ticker: "MOVE", company: "MoveNow" },
  { ticker: "NET", company: "Netlink" },
  { ticker: "NOVA", company: "Nova Ventures" },
  { ticker: "OILS", company: "OilSands" },
  { ticker: "PARK", company: "Park Realty" },
  { ticker: "PHAR", company: "Pharmax" },
  { ticker: "PLNT", company: "Plantio" },
  { ticker: "PROD", company: "Prodigo" },
  { ticker: "QBIT", company: "QBit Quantum" },
  { ticker: "RAIL", company: "Rail Cargo" },
  { ticker: "ROBO", company: "RoboMakers" },
  { ticker: "SAFE", company: "SafeSecurity" },
  { ticker: "SHIP", company: "ShipIt" },
  { ticker: "SHOP", company: "ShopNow" },
  { ticker: "SOLR", company: "Solaris" },
  { ticker: "TEL", company: "TelcoPlus" },
  { ticker: "TRVL", company: "TravelBee" },
  { ticker: "WATR", company: "WaterWorks" },
];

const COMPANY_BY_TICKER = new Map(CATALOG.map((c) => [c.ticker, c.company]));

/** @type {Map<string, {es: EventSource, status: 'connecting'|'open'|'error'|'closed', last?: any, history: number[], lastErr?: string, lastEventType?: string, lastRaw?: string}>} */
const streams = new Map();

const $tickerList = document.getElementById("tickerList");
const $rows = document.getElementById("rows");
const $connStatus = document.getElementById("connStatus");
const $clearBtn = document.getElementById("clearBtn");

function fmtPrice(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  return n.toFixed(2);
}

function fmtTs(ts) {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

function setGlobalStatus() {
  const values = [...streams.values()].map((s) => s.status);
  const anyOpen = values.includes("open");
  const anyConnecting = values.includes("connecting");
  const anyError = values.includes("error");

  if (values.length === 0) {
    $connStatus.textContent = "Disconnected";
    $connStatus.className = "pill";
    return;
  }

  if (anyOpen && !anyError) {
    $connStatus.textContent = "Connected";
    $connStatus.className = "pill ok";
    return;
  }

  if (anyConnecting && !anyOpen && !anyError) {
    $connStatus.textContent = "Connecting…";
    $connStatus.className = "pill";
    return;
  }

  if (anyError && !anyOpen) {
    $connStatus.textContent = "Error";
    $connStatus.className = "pill bad";
    return;
  }

  $connStatus.textContent = "Partial";
  $connStatus.className = "pill";
}

function ensureRow(ticker) {
  let tr = $rows.querySelector(`tr[data-ticker="${ticker}"]`);
  if (tr) return tr;

  const company = COMPANY_BY_TICKER.get(ticker) ?? "—";
  tr = document.createElement("tr");
  tr.dataset.ticker = ticker;
  tr.innerHTML = `
    <td><code>${ticker}</code></td>
    <td>${company}</td>
    <td class="num" data-k="price">—</td>
    <td data-k="ts">—</td>
    <td><canvas class="spark" width="120" height="28" data-k="spark"></canvas></td>
    <td class="status" data-k="status">closed</td>
  `;
  $rows.appendChild(tr);
  return tr;
}

function removeRow(ticker) {
  const tr = $rows.querySelector(`tr[data-ticker="${ticker}"]`);
  if (tr) tr.remove();
}

function drawSpark(canvas, history) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (!history || history.length < 2) {
    ctx.fillStyle = "rgba(232,234,242,0.35)";
    ctx.fillRect(0, h - 1, w, 1);
    return;
  }

  const min = Math.min(...history);
  const max = Math.max(...history);
  const span = Math.max(1e-9, max - min);

  const padX = 2;
  const padY = 3;
  const usableW = w - padX * 2;
  const usableH = h - padY * 2;

  function x(i) {
    return padX + (i / (history.length - 1)) * usableW;
  }
  function y(v) {
    const t = (v - min) / span;
    return padY + (1 - t) * usableH;
  }

  // baseline
  ctx.strokeStyle = "rgba(232,234,242,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h - 1);
  ctx.lineTo(w, h - 1);
  ctx.stroke();

  // line
  const last = history[history.length - 1];
  const first = history[0];
  const up = last >= first;
  ctx.strokeStyle = up ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i < history.length; i++) {
    const px = x(i);
    const py = y(history[i]);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // last dot
  ctx.fillStyle = up ? "rgba(34,197,94,0.95)" : "rgba(239,68,68,0.95)";
  ctx.beginPath();
  ctx.arc(x(history.length - 1), y(last), 2.2, 0, Math.PI * 2);
  ctx.fill();
}

function render(ticker) {
  const s = streams.get(ticker);
  if (!s) return;

  const tr = ensureRow(ticker);
  tr.querySelector('[data-k="price"]').textContent = fmtPrice(s.last?.price);
  tr.querySelector('[data-k="ts"]').textContent = fmtTs(s.last?.ts);

  const $status = tr.querySelector('[data-k="status"]');
  const base =
    s.status === "open" && !s.last ? "open (waiting for ticks…)" : s.status;
  $status.textContent =
    s.status === "error"
      ? `error${s.lastErr ? `: ${s.lastErr}` : ""}`
      : s.lastEventType
        ? `${base} • last event: ${s.lastEventType}`
        : base;
  $status.className = `status ${s.status === "open" ? "ok" : ""} ${
    s.status === "error" ? "bad" : ""
  }`.trim();

  const canvas = tr.querySelector('[data-k="spark"]');
  drawSpark(canvas, s.history);
}

function subscribe(ticker) {
  if (streams.has(ticker)) return;

  const url = `/api/stream?ticker=${encodeURIComponent(ticker)}`;
  const es = new EventSource(url);

  const state = {
    es,
    status: "connecting",
    history: [],
  };
  streams.set(ticker, state);

  const onOpen = () => {
    state.status = "open";
    state.lastErr = undefined;
    render(ticker);
    setGlobalStatus();
  };

  const onError = () => {
    state.status = "error";
    state.lastErr = "SSE connection error";
    render(ticker);
    setGlobalStatus();
  };

  const ingestPayload = (payload) => {
    // Accept a few common shapes:
    // 1) { data: [ { ticker, ts, price, ... }, ... ] }
    // 2) { ticker, ts, price, ... }
    // 3) [ { ticker, ts, price, ... }, ... ]
    const items = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : payload && typeof payload === "object"
          ? [payload]
          : [];

    for (const item of items) {
      if (!item || item.ticker !== ticker) continue;
      state.last = item;
      if (typeof item.price === "number") {
        state.history.push(item.price);
        if (state.history.length > 30)
          state.history.splice(0, state.history.length - 30);
      }
    }
  };

  const onAnyEvent = (ev) => {
    try {
      state.lastEventType = ev.type || "message";
      state.lastRaw = typeof ev.data === "string" ? ev.data : undefined;
      const payload =
        typeof ev.data === "string" && ev.data.length ? JSON.parse(ev.data) : null;
      ingestPayload(payload);
      render(ticker);
      setGlobalStatus();
    } catch (e) {
      // If upstream sends non-JSON, keep connection status but don't crash UI.
      state.lastEventType = ev.type || "message";
      state.lastRaw = typeof ev.data === "string" ? ev.data : undefined;
      render(ticker);
    }
  };

  es.addEventListener("open", onOpen);
  es.addEventListener("error", onError);
  // Some SSE servers use named events (event: update). Listen to a few common ones.
  es.addEventListener("message", onAnyEvent);
  es.addEventListener("update", onAnyEvent);
  es.addEventListener("tick", onAnyEvent);
  es.addEventListener("price", onAnyEvent);

  render(ticker);
  setGlobalStatus();
}

function unsubscribe(ticker) {
  const state = streams.get(ticker);
  if (!state) return;
  try {
    state.es.close();
  } catch {
    // ignore
  }
  streams.delete(ticker);
  removeRow(ticker);
  setGlobalStatus();
}

function renderTickerList() {
  $tickerList.innerHTML = "";
  for (const c of CATALOG) {
    const label = document.createElement("label");
    label.className = "ticker";
    label.innerHTML = `
      <input type="checkbox" data-ticker="${c.ticker}" />
      <span class="sym">${c.ticker}</span>
      <span class="muted">${c.company}</span>
    `;
    $tickerList.appendChild(label);
  }

  $tickerList.addEventListener("change", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    const ticker = el.dataset.ticker;
    if (!ticker) return;
    if (el.checked) subscribe(ticker);
    else unsubscribe(ticker);
  });

  $clearBtn.addEventListener("click", () => {
    for (const cb of $tickerList.querySelectorAll("input[type=checkbox]")) {
      cb.checked = false;
    }
    for (const t of [...streams.keys()]) unsubscribe(t);
  });
}

renderTickerList();
setGlobalStatus();

