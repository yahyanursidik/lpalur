# NataAlur — Landing page `nataalur.my.id`

Website marketing NataAlur (Astro 7, SSG, tanpa framework UI). Terpisah dari aplikasi ERP Laravel.
Spesifikasi konten & desain: [`NataAlur_Landing_Page_Brief_v1.0.md`](NataAlur_Landing_Page_Brief_v1.0.md).

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # hasil statis di dist/
npm run preview    # uji hasil build
```

## Struktur

```text
assets-src/            File sumber logo & screenshot (bukan untuk dipublikasikan langsung)
scripts/prepare-assets.mjs  Membuat favicon, logo transparan, screenshot WebP, og-image
public/                Aset siap saji (favicon, og-image.png, robots.txt, site.webmanifest, assets/)
src/data/site.ts       Semua copy: modul, masalah, industri, FAQ, email kontak
src/components/        Header, Hero, DashboardPreview, ProcessMarquee, Problems, Modules,
                       Workflow, Industries, Deployment, FAQ, ContactCTA, Footer, Icon, Scribble, MockShell
src/layouts/BaseLayout.astro  Meta SEO, OG, canonical, JSON-LD Organization
src/scripts/main.ts    Interaksi & animasi (mega menu, tab auto-advance, scroll-linked flow, form)
src/styles/            tokens.css (warna, tipografi, spacing) + global.css
```

## Mengganti aset

1. Taruh file baru di `assets-src/` dengan nama yang sama (`mark-source.webp`, `logo-horizontal-source.webp`, `app-produk-jadi.png`).
2. Jalankan `npm run assets`.
3. Saat file vektor (SVG) logo sudah tersedia, ganti `public/assets/logo-horizontal.webp` dan favicon dengan versi SVG.

## Formulir kontak

Salin `.env.example` menjadi `.env`:

- `PUBLIC_FORM_ENDPOINT` — endpoint Formspree, format `https://formspree.io/f/<id-form>`. Jika kosong, tombol kirim membuka aplikasi email (mailto) dengan pesan terisi.
- `PUBLIC_CONTACT_EMAIL` — **`halo@nataalur.my.id` masih placeholder; pastikan aktif sebelum publikasi.**

Formspree menerima kiriman JSON (dengan JS) maupun POST biasa (tanpa JS). Field yang dikirim: `nama`, `perusahaan`, `kontak`, `jenis_usaha`, `kebutuhan`, `persetujuan`, `sumber`, plus `_subject` dan `email` (reply-to, hanya bila kontak berupa email). Honeypot memakai nama `_gotcha` yang otomatis disaring Formspree. Di dashboard Formspree, batasi domain ke `nataalur.my.id` (Settings → Allowed domains) dan aktifkan reCAPTCHA/spam filter bila perlu. Karena variabel ini dibaca saat build, set juga di environment variables platform hosting lalu build ulang.

Proteksi sisi klien: validasi, honeypot `_gotcha`, dan jeda 60 detik antar kiriman. Rate limiting tetap wajib di sisi endpoint.

## Deployment

Build menghasilkan file statis di `dist/` — cocok untuk Cloudflare Pages, Netlify, atau Coolify (static site).

| Platform | Build command | Output |
| --- | --- | --- |
| Cloudflare Pages / Netlify | `npm run build` | `dist` |
| Coolify (Nixpacks/static) | `npm run build` | `dist` |

Setelah domain aktif: pastikan HTTPS, cek `https://nataalur.my.id/sitemap-index.xml` dan `/robots.txt`, lalu daftarkan sitemap di Google Search Console.

Header keamanan yang disarankan (atur di platform hosting):

```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io mailto:; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Prosedur pembaruan konten

- Teks modul, industri, FAQ, dan kontak: edit `src/data/site.ts`.
- Judul/hero/CTA: edit komponen terkait di `src/components/`.
- Mockup dashboard diberi label **"Ilustrasi tampilan — data contoh"**; screenshot aplikasi diberi label **data demo**. Pertahankan label ini sampai ada data produksi yang terverifikasi.
- Jangan menambahkan testimonial, logo pelanggan, angka hasil, atau harga paket tanpa bukti dan persetujuan.
- Halaman `/kebijakan-privasi` masih **draf** — tinjau sebelum publikasi.
