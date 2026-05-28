import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.DASHBOARD_PORT ?? 4001);
const MOCK_BASE = process.env.MOCK_BASE ?? "http://127.0.0.1:4000";

const app = express();

app.use("/api", (req, res) => {
  const target = new URL(req.originalUrl, MOCK_BASE);
  const proxyReq = http.request(
    target,
    { method: req.method, headers: { ...req.headers, host: target.host } },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode ?? 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );
  proxyReq.on("error", (err) => {
    res.status(502).json({ error: "Mock API unreachable", detail: String(err) });
  });
  req.pipe(proxyReq);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock dashboard on http://localhost:${PORT} (API → ${MOCK_BASE})`);
});
