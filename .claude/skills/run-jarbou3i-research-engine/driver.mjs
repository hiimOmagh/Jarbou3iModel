#!/usr/bin/env node
/**
 * driver.mjs — headless interaction harness for Jarbou3i Research Engine
 *
 * Usage (server must already be running on port 4173):
 *   node .claude/skills/run-jarbou3i-research-engine/driver.mjs [command]
 *
 * Commands:
 *   screenshot [file]   — capture desktop viewport (default: /tmp/jarbou3i-ss.png)
 *   mobile [file]       — capture 375×812 mobile viewport
 *   lang <ar|en|fr>     — switch language then screenshot
 *   overflow            — report horizontal overflow in px (must be 0)
 *   navigate <tab>      — click a nav tab by partial label text, then screenshot
 *   guided              — click "Start guided setup" CTA then screenshot
 *   version             — print visible version label text
 *   smoke               — full smoke: overflow + version + all three languages
 */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE   = 'http://127.0.0.1:4173';
const ARGS   = ['--no-sandbox', '--disable-gpu'];

const [,, cmd = 'screenshot', arg = '/tmp/jarbou3i-ss.png'] = process.argv;

async function withPage(viewport, fn) {
  const browser = await chromium.launch({ executablePath: CHROME, args: ARGS });
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    return await fn(page);
  } finally {
    await browser.close();
  }
}

async function switchLang(page, lang) {
  const id = { ar: '#langAr', en: '#langEn', fr: '#langFr' }[lang];
  if (!id) throw new Error(`Unknown lang: ${lang}. Use ar, en, or fr.`);
  await page.click(id);
  await page.waitForTimeout(800);
}

async function getOverflow(page) {
  return page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
}

async function getVersion(page) {
  const body = await page.evaluate(() => document.body.innerText);
  const m = body.match(/v1\.\d+\.\d+[^\n]*/);
  return m ? m[0].trim() : 'version not found';
}

switch (cmd) {
  case 'screenshot': {
    const out = arg || '/tmp/jarbou3i-ss.png';
    await withPage({ width: 1280, height: 800 }, async page => {
      await page.screenshot({ path: out });
      console.log('screenshot saved:', out);
    });
    break;
  }

  case 'mobile': {
    const out = arg || '/tmp/jarbou3i-mobile.png';
    await withPage({ width: 375, height: 812 }, async page => {
      await page.screenshot({ path: out });
      const ov = await getOverflow(page);
      console.log('mobile screenshot saved:', out);
      console.log('horizontal overflow px:', ov);
    });
    break;
  }

  case 'lang': {
    const lang = arg || 'en';
    const out = `/tmp/jarbou3i-${lang}.png`;
    await withPage({ width: 1280, height: 800 }, async page => {
      await switchLang(page, lang);
      await page.screenshot({ path: out });
      const h1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => '?');
      console.log(`lang=${lang} h1: ${h1}`);
      console.log('screenshot saved:', out);
    });
    break;
  }

  case 'overflow': {
    await withPage({ width: 1280, height: 800 }, async page => {
      const ov = await getOverflow(page);
      console.log('horizontal overflow px:', ov);
      if (ov !== 0) { console.error('FAIL: overflow must be 0'); process.exit(1); }
    });
    break;
  }

  case 'navigate': {
    const label = arg;
    if (!label) { console.error('Usage: navigate <partial-tab-label>'); process.exit(1); }
    const out = `/tmp/jarbou3i-nav.png`;
    await withPage({ width: 1280, height: 800 }, async page => {
      await switchLang(page, 'en');
      const buttons = await page.$$('button');
      let clicked = false;
      for (const btn of buttons) {
        const txt = await btn.evaluate(el => el.textContent.trim());
        if (txt.toLowerCase().includes(label.toLowerCase())) {
          console.log('clicking:', txt);
          await btn.click();
          await page.waitForTimeout(800);
          clicked = true;
          break;
        }
      }
      if (!clicked) { console.error(`No button found matching: ${label}`); process.exit(1); }
      await page.screenshot({ path: out });
      console.log('screenshot saved:', out);
    });
    break;
  }

  case 'guided': {
    const out = '/tmp/jarbou3i-guided.png';
    await withPage({ width: 1280, height: 800 }, async page => {
      await switchLang(page, 'en');
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const txt = await btn.evaluate(el => el.textContent.trim());
        if (txt.toLowerCase().includes('guided') || txt.toLowerCase().includes('start guided')) {
          console.log('clicking:', txt);
          await btn.click();
          await page.waitForTimeout(1000);
          break;
        }
      }
      await page.screenshot({ path: out });
      console.log('screenshot saved:', out);
    });
    break;
  }

  case 'version': {
    await withPage({ width: 1280, height: 800 }, async page => {
      const v = await getVersion(page);
      console.log('version:', v);
    });
    break;
  }

  case 'smoke': {
    console.log('=== SMOKE RUN ===');
    await withPage({ width: 1280, height: 800 }, async page => {
      // 1. overflow
      const ov = await getOverflow(page);
      console.log('overflow px:', ov, ov === 0 ? 'PASS' : 'FAIL');

      // 2. version
      const v = await getVersion(page);
      console.log('version:', v);

      // 3. all three languages
      for (const lang of ['ar', 'en', 'fr']) {
        await switchLang(page, lang);
        const h1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => '?');
        const dir = await page.$eval('html', el => el.getAttribute('dir')).catch(() => '?');
        const out = `/tmp/jarbou3i-smoke-${lang}.png`;
        await page.screenshot({ path: out });
        console.log(`lang=${lang} dir=${dir} h1="${h1}" → ${out}`);
      }

      // 4. guided CTA
      await switchLang(page, 'en');
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const txt = await btn.evaluate(el => el.textContent.trim());
        if (txt.toLowerCase().includes('guided')) {
          await btn.click();
          await page.waitForTimeout(800);
          await page.screenshot({ path: '/tmp/jarbou3i-smoke-guided.png' });
          console.log('guided CTA clicked → /tmp/jarbou3i-smoke-guided.png');
          break;
        }
      }

      if (ov !== 0) { console.error('SMOKE FAIL: horizontal overflow'); process.exit(1); }
      console.log('=== SMOKE PASS ===');
    });
    break;
  }

  default:
    console.error(`Unknown command: ${cmd}`);
    console.error('Commands: screenshot, mobile, lang, overflow, navigate, guided, version, smoke');
    process.exit(1);
}
