/**
 * Renders index.html with @media print styles via Chromium (same stack as Chrome “Save as PDF”).
 * Output PDF keeps real text objects (selectable; editable in tools like Acrobat), not canvas raster.
 */
import { chromium } from 'playwright';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const indexPath = join(root, 'index.html');
const outPath = join(root, 'Dang_Anh_Van_Java_Developer_CV.pdf');

if (!existsSync(indexPath)) {
  console.error('generate-pdf: index.html not found at', indexPath);
  process.exit(1);
}

const fileUrl = pathToFileURL(indexPath).href;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print' });
  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForSelector('.page', { state: 'visible' });
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  console.log('Wrote', outPath);
} finally {
  await browser.close();
}
