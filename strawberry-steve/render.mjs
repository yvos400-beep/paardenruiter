// Renders scene.html frame-by-frame and encodes a 1080x1920 MP4.
// usage: node render.mjs [outDir] [fps] [onlyTimes,comma,separated]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = process.argv[2] || path.join(here, "frames");
const fps = Number(process.argv[3] || 30);
const only = process.argv[4] ? process.argv[4].split(",").map(Number) : null;
const DURATION = 10;

const types = { ".html": "text/html", ".js": "text/javascript", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  const f = path.join(here, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(here) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const port = server.address().port;

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on("console", m => console.log("[page]", m.text()));
page.on("pageerror", e => console.log("[pageerror]", e.message));
await page.goto(`http://localhost:${port}/scene.html`);
await page.waitForFunction(() => window.READY === true, null, { timeout: 120000 });

const times = only ?? Array.from({ length: DURATION * fps }, (_, i) => i / fps);
const t0 = Date.now();
for (let i = 0; i < times.length; i++) {
  await page.evaluate(t => window.renderAt(t), times[i]);
  const name = only ? `t_${times[i].toFixed(2)}.png` : `f_${String(i).padStart(4, "0")}.png`;
  await page.screenshot({ path: path.join(outDir, name) });
  if (i % 30 === 0) console.log(`frame ${i}/${times.length}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
await browser.close();
server.close();

if (!only) {
  const out = path.join(here, "strawberry-steve-intro.mp4");
  execFileSync("ffmpeg", ["-y", "-framerate", String(fps), "-i", path.join(outDir, "f_%04d.png"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: "inherit" });
  console.log("wrote", out);
}
