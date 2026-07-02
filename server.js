const express = require('express');
const puppeteer = require('puppeteer-core');
const { renderSlide, renderPin } = require('./templates');

const PORT = process.env.PORT || 4000;
const SECRET = process.env.SHARED_SECRET || '';
const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium';
const IDLE_MS = Number(process.env.IDLE_CLOSE_MS || 120000); // close Chromium after 2 min idle to free RAM

const app = express();
app.use(express.json({ limit: '4mb' }));

let browser = null;
let idleTimer = null;

function scheduleIdleClose() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(async () => {
    if (browser) { try { await browser.close(); } catch (e) {} browser = null; }
  }, IDLE_MS);
}

async function getBrowser() {
  clearTimeout(idleTimer);
  if (!browser || !browser.isConnected()) {
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: CHROME,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none']
    });
  }
  return browser;
}

function authed(req, res) {
  if (!SECRET) return true;
  if ((req.headers.authorization || '') === 'Bearer ' + SECRET) return true;
  res.status(401).json({ error: 'unauthorized' });
  return false;
}

async function shoot(html, width, height) {
  const page = await (await getBrowser()).newPage();
  try {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
    try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (e) {}
    const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });
    return buf.toString('base64');
  } finally {
    await page.close();
    scheduleIdleClose();
  }
}

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/carousel', async (req, res) => {
  if (!authed(req, res)) return;
  try {
    const slides = (req.body && req.body.slides) || [];
    const images = [];
    for (const s of slides) images.push(await shoot(renderSlide(s), 1080, 1350));
    res.json({ count: images.length, images });
  } catch (e) { res.status(500).json({ error: String((e && e.message) || e) }); }
});

app.post('/pin', async (req, res) => {
  if (!authed(req, res)) return;
  try { res.json({ image: await shoot(renderPin(req.body || {}), 1000, 1500) }); }
  catch (e) { res.status(500).json({ error: String((e && e.message) || e) }); }
});

app.listen(PORT, () => console.log('social-renderer listening on :' + PORT));
