// Screenshot live sites: load, scroll to the bottom once (lazy images, reveal animations), back to top, shoot.
// Usage: node shoot-live.mjs <outDir> id=url id=url ...
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [outDir, ...pairs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const port = 9400 + Math.floor(Math.random() * 400);
const profile = join(tmpdir(), 'shoot-live-profile');
rmSync(profile, { recursive: true, force: true });
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--window-size=1440,900', 'about:blank'
], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function json(path, method = 'GET') {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${port}${path}`, { method }); return await r.json(); } catch { await sleep(250); }
  }
  throw new Error('chrome not reachable');
}

function connect(ws) {
  const sock = new WebSocket(ws); let id = 0; const pending = new Map(); const listeners = [];
  sock.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else listeners.forEach(f => f(d)); };
  return new Promise(res => sock.onopen = () => res({
    send: (method, params = {}) => new Promise((ok, bad) => { const i = ++id; pending.set(i, d => d.error ? bad(new Error(method + ': ' + d.error.message)) : ok(d.result)); sock.send(JSON.stringify({ id: i, method, params })); }),
    on: f => listeners.push(f), close: () => sock.close()
  }));
}

const SCROLL = `(async () => {
  const s = ms => new Promise(r => setTimeout(r, ms));
  let y = 0;
  for (let i = 0; i < 80; i++) {
    const h = document.documentElement.scrollHeight;
    y += Math.round(innerHeight * 0.7); scrollTo(0, y); await s(280);
    if (y + innerHeight >= document.documentElement.scrollHeight) break;
  }
  await s(1200); scrollTo(0, 0); await s(1800);
  return document.documentElement.scrollHeight;
})()`;

try {
  await json('/json/version');
  for (const pair of pairs) {
    const [name, url] = pair.split(/=(.+)/);
    const t0 = Date.now();
    let tm; const guard = new Promise((_, bad) => tm = setTimeout(() => bad(new Error('timeout')), 90000));
    try { await Promise.race([guard, (async () => {
      const tab = await json('/json/new?about:blank', 'PUT');
      console.log('  tab', tab.webSocketDebuggerUrl); const c = await connect(tab.webSocketDebuggerUrl); console.log('  connected');
      await c.send('Page.enable');
      await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
      const loaded = new Promise(r => c.on(d => d.method === 'Page.loadEventFired' && r()));
      await c.send('Page.navigate', { url }); console.log('  navigating');
      await Promise.race([loaded, sleep(30000)]);
      await sleep(5000); console.log('  loaded');
      if (process.env.CLEAN) await c.send('Runtime.evaluate', { expression: process.env.CLEAN, awaitPromise: true });
      const { result } = await c.send('Runtime.evaluate', { expression: SCROLL, awaitPromise: true, returnByValue: true });
      console.log('  scrolled');
      if (process.env.CLEAN) await c.send('Runtime.evaluate', { expression: process.env.CLEAN, awaitPromise: true });
      await sleep(800);
      const h = Math.min(result.value || 900, 12000);
      const shot = await c.send('Page.captureScreenshot', { format: 'jpeg', quality: 88 });
      writeFileSync(join(outDir, `${name}.jpg`), Buffer.from(shot.data, 'base64'));
      const full = await c.send('Page.captureScreenshot', { format: 'jpeg', quality: 82, captureBeyondViewport: true, clip: { x: 0, y: 0, width: 1440, height: h, scale: 0.6 } });
      writeFileSync(join(outDir, `${name}-full.jpg`), Buffer.from(full.data, 'base64'));
      c.close(); await fetch(`http://127.0.0.1:${port}/json/close/${tab.id}`).catch(() => {});
      console.log(`ok ${name} h=${h} ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    })()]); } catch (e) { console.log(`FAIL ${name}: ${e.message}`); } finally { clearTimeout(tm); }
  }
} finally { chrome.kill(); process.exit(0); }
