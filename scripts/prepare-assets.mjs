// Menyiapkan aset publik dari file sumber di /assets-src.
// Jalankan: npm run assets
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';

const SRC = 'assets-src';
const OUT = 'public';
await mkdir(`${OUT}/assets`, { recursive: true });

// Ubah latar putih menjadi transparan (un-multiply terhadap putih) agar tepi tetap halus.
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const m = Math.min(r, g, b);
    let a = m > 244 ? 0 : 1 - m / 255;
    if (a < 0.04) a = 0;
    if (a === 0) { data[i + 3] = 0; continue; }
    data[i] = Math.round(Math.max(0, Math.min(255, (r - (1 - a) * 255) / a)));
    data[i + 1] = Math.round(Math.max(0, Math.min(255, (g - (1 - a) * 255) / a)));
    data[i + 2] = Math.round(Math.max(0, Math.min(255, (b - (1 - a) * 255) / a)));
    data[i + 3] = Math.round(a * 255);
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

async function trimmed(input) {
  const transparent = await whiteToAlpha(input);
  return sharp(transparent).trim({ threshold: 1 }).png().toBuffer();
}

// --- Simbol N ---
const mark = await trimmed(`${SRC}/mark-source.webp`);
const markMeta = await sharp(mark).metadata();
const side = Math.max(markMeta.width, markMeta.height);
const markSquare = await sharp(mark)
  .resize(side, side, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(markSquare).resize(512, 512).png().toFile(`${OUT}/assets/mark.png`);
await sharp(markSquare).resize(160, 160).webp({ quality: 92 }).toFile(`${OUT}/assets/mark.webp`);
await sharp(markSquare).resize(192, 192).png().toFile(`${OUT}/icon-192.png`);
await sharp(markSquare).resize(512, 512).png().toFile(`${OUT}/icon-512.png`);
await sharp(markSquare).resize(32, 32).png().toFile(`${OUT}/favicon-32.png`);

// Apple touch icon: latar putih + ruang aman.
const inner = await sharp(markSquare).resize(132, 132).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: inner, gravity: 'center' }])
  .png()
  .toFile(`${OUT}/apple-touch-icon.png`);

// favicon.ico berisi PNG 16/32/48 (format ICO dengan payload PNG).
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(markSquare).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
await writeFile(`${OUT}/favicon.ico`, Buffer.concat([header, ...pngs]));

// --- Logo horizontal ---
const logo = await trimmed(`${SRC}/logo-horizontal-source.webp`);
await sharp(logo).resize({ width: 720 }).webp({ quality: 92, alphaQuality: 100 }).toFile(`${OUT}/assets/logo-horizontal.webp`);
await sharp(logo).resize({ width: 720 }).png().toFile(`${OUT}/assets/logo-horizontal.png`);
const logoMeta = await sharp(logo).resize({ width: 720 }).metadata();

// --- Screenshot aplikasi ---
const shot = `${SRC}/app-produk-jadi.png`;
const shotMeta = await sharp(shot).metadata();
await sharp(shot).webp({ quality: 86 }).toFile(`${OUT}/assets/app-produk-jadi.webp`);
await sharp(shot).resize({ width: 960 }).webp({ quality: 84 }).toFile(`${OUT}/assets/app-produk-jadi-960.webp`);

// --- OG image 1200x630 ---
const ogLogo = await sharp(logo).resize({ width: 560 }).png().toBuffer();
const ogLogoMeta = await sharp(ogLogo).metadata();
const ogSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#EEF3FC"/><stop offset="1" stop-color="#E8F7F1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#FBFCFB"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#g)" opacity=".8"/>
  <path d="M-40 520 C 260 420, 420 640, 720 540 S 1100 420, 1260 500" fill="none" stroke="#154BA4" stroke-opacity=".14" stroke-width="40" stroke-linecap="round"/>
  <path d="M-40 580 C 260 480, 420 700, 720 600 S 1100 480, 1260 560" fill="none" stroke="#079F77" stroke-opacity=".16" stroke-width="40" stroke-linecap="round"/>
  <text x="600" y="410" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="800" fill="#172B38">Bisnis berjalan. Semua alurnya tertata.</text>
  <text x="600" y="462" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#64747C">ERP modular untuk bisnis Indonesia · Self-hosted atau private cloud</text>
</svg>`);
await sharp(ogSvg)
  .composite([{ input: ogLogo, top: 110, left: Math.round((1200 - ogLogoMeta.width) / 2) }])
  .png()
  .toFile(`${OUT}/og-image.png`);

console.log('logo', logoMeta.width, logoMeta.height, '| shot', shotMeta.width, shotMeta.height, '| og logo h', ogLogoMeta.height);
