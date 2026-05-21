import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const UPSTREAM_BASE =
  process.env.UPSTREAM_BASE ?? "https://add.piotrkojalowicz.dev";
const API_KEY = process.env.API_KEY ?? "";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/stream", async (req, res) => {
  const ticker = String(req.query.ticker ?? "").trim();
  if (!ticker) {
    res.status(400).json({ error: "Missing required query param: ticker" });
    return;
  }

  if (!API_KEY) {
    res.status(500).json({
      error:
        "Server is missing API_KEY. Set it in your environment before starting.",
    });
    return;
  }

  const url = new URL("/api/stream", UPSTREAM_BASE);
  url.searchParams.set("ticker", ticker);

  const upstream = await fetch(url, {
    headers: {
      "X-API-Key": API_KEY,
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    res
      .status(502)
      .json({ error: "Upstream stream failed", status: upstream.status, text });
    return;
  }

  res.status(200);
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  try {
    const reader = upstream.body.getReader();
    req.on("close", () => {
      try {
        reader.cancel();
      } catch {
        // ignore
      }
    });
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  } catch (e) {
    // Client disconnected or upstream ended. Nothing to do.
  } finally {
    res.end();
  }
});

function listenWithFallback(startPort, maxAttempts = 20) {
  let port = startPort;
  let attempts = 0;

  const server = app.listen(port);

  server.on("listening", () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${port}`);
    if (port !== startPort) {
      // eslint-disable-next-line no-console
      console.log(
        `Port ${startPort} was busy, so we started on ${port}. ` +
          `Tip: set PORT=${port} to make this stable.`,
      );
    }
  });

  server.on("error", (err) => {
    if (err && typeof err === "object" && err.code === "EADDRINUSE") {
      attempts += 1;
      if (attempts >= maxAttempts) {
        // eslint-disable-next-line no-console
        console.error(
          `Could not find a free port starting from ${startPort}. ` +
            `Try setting PORT to a free value (e.g. 3100).`,
        );
        process.exitCode = 1;
        return;
      }
      const nextPort = port + 1;
      // eslint-disable-next-line no-console
      console.warn(`Port ${port} in use, trying ${nextPort}...`);
      port = nextPort;
      server.close(() => {
        server.listen(port);
      });
      return;
    }

    // eslint-disable-next-line no-console
    console.error("Server failed to start:", err);
    process.exitCode = 1;
  });
}

listenWithFallback(PORT);

