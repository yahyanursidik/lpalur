# NataAlur — Landing Page Brief & Website Specification

**Versi:** 1.0  
**Tanggal:** 25 Oktober 2026  
**Website:** `nataalur.my.id`  
**Jenis dokumen:** Product brief, content specification, design direction, dan panduan implementasi website  
**Status:** Draft siap digunakan untuk pengembangan dan validasi bisnis

---

## 1. Ringkasan

NataAlur adalah produk **ERP modular** untuk membantu usaha di Indonesia menata proses pembelian, persediaan, produksi, penjualan, pengiriman, dan keuangan dalam satu sistem terhubung. Model produk **bukan SaaS multi-tenant**. NataAlur dirancang untuk **instalasi independen per perusahaan**, baik pada server lokal (*self-hosted/on-premise*) maupun *private cloud/VPS* yang dikelola secara khusus.

Landing page bertujuan menyampaikan manfaat NataAlur dengan bahasa yang mudah dipahami pemilik usaha dan tim operasional; bukan menjadi katalog fitur teknis yang panjang. BAC merupakan pilot implementasi awal, tetapi NataAlur tidak boleh diposisikan sebagai aplikasi khusus BAC.

### Nilai utama

> **Bisnis berjalan. Semua alurnya tertata.**

Dari bahan baku dan pembelian, pekerjaan workshop, stok barang, hingga transaksi dan keuangan: informasi terhubung, proses lebih mudah dilacak.

### Referensi pendekatan

- **Odoo**: modul bisnis yang terlihat jelas, solusi per proses dan jenis usaha, manfaat praktis.
- **Notion**: whitespace lapang, hierarki judul kuat, komunikasi singkat, produk menjadi visual utama.
- **NataAlur**: identitas visual sendiri (simbol N beralur, biru-hijau), konteks Indonesia, aksesibilitas, dan tanpa menyalin aset, tata letak spesifik, atau copywriting kompetitor.

---

## 2. Tujuan dan indikator keberhasilan

**Tujuan utama:** mengubah pengunjung yang relevan menjadi calon pelanggan konsultasi implementasi ERP (*qualified inquiry*).

**Tujuan pendukung:**

1. Pengunjung memahami fungsi NataAlur dalam 5–10 detik pertama.
2. Menjelaskan bahwa modul dapat disesuaikan dengan alur bisnis.
3. Menunjukkan contoh operasional nyata tanpa klaim fitur telah dirilis.
4. Memperjelas pilihan self-hosted atau private cloud per perusahaan.
5. Mendukung pencarian organik melalui performa, aksesibilitas, dan SEO.

**Metrik yang perlu dipantau setelah peluncuran:** jumlah inquiry berkualitas, rasio klik CTA, rasio formulir/kontak selesai, sumber kunjungan organik, Core Web Vitals, dan engagement tiap bagian halaman.

Tidak menetapkan target angka konversi sebelum tersedia baseline traffic dan data pengujian.

---

## 3. Audiens

| Audiens | Masalah utama | Pesan yang relevan |
| --- | --- | --- |
| Owner UKM manufaktur | Sulit mengetahui stok, biaya, dan pesanan | Semua aktivitas bisnis lebih mudah dipantau |
| Kepala workshop | Tidak jelas progres pekerjaan dan kebutuhan material | Produksi dan pekerjaan dapat ditelusuri |
| Staf gudang/pembelian | Data stok tersebar, reorder terlambat | Penerimaan, pengeluaran, pembelian tercatat |
| Owner distributor/retail | Banyak toko dan gudang berjalan sendiri | Stok serta penjualan per lokasi terhubung |
| Finance/admin | Transaksi harus diinput ulang dan sulit direkonsiliasi | Data operasional mendukung pembukuan yang tertib |

**Nada bahasa:** bahasa Indonesia natural, profesional, membumi, percaya diri namun tidak hiperbolis. Hindari jargon panjang, klaim hasil tanpa bukti, dan istilah yang terlalu teknis di halaman utama.

---

## 4. Arsitektur informasi website

Navigasi awal cukup: **Solusi**, **Fitur**, **Industri**, **Implementasi**, serta CTA **Diskusikan kebutuhan**.

Halaman utama disusun berikut:

| Urutan | Bagian | Tujuan | Panjang konten |
| --- | --- | --- | --- |
| 01 | Header | Identitas dan navigasi cepat | Sangat singkat |
| 02 | Hero | Menjelaskan proposisi nilai | 1 headline + 1 kalimat |
| 03 | Product preview | Memperlihatkan produk secara visual | UI mockup, sedikit keterangan |
| 04 | Masalah bisnis | Memunculkan relevansi | 3 kartu pendek |
| 05 | Modul | Menjelaskan cakupan solusi | 8 kartu ringkas |
| 06 | Workflow | Menunjukkan hubungan antarproses | 5 langkah visual |
| 07 | Industri | Menunjukkan relevansi lintas bisnis | 3 kartu |
| 08 | Implementasi | Memperjelas deployment | 2 model + migrasi |
| 09 | FAQ | Menjawab keberatan utama | 3–5 pertanyaan |
| 10 | Final CTA + footer | Mengarahkan inquiry | 1 ajakan utama |

Saat kebutuhan konten bertambah, pertimbangkan halaman `/fitur`, `/solusi/produksi`, `/solusi/retail`, `/implementasi`, dan `/kontak`, bukan menjejalkan semuanya ke halaman utama.

---

## 5. Copywriting final halaman utama

### 5.1 Header

**Logo:** NataAlur (simbol N beralur biru–hijau).  
**Menu:** Solusi · Fitur · Industri · Implementasi  
**CTA:** `Diskusikan kebutuhan`

### 5.2 Hero

**Eyebrow:** `ERP modular untuk bisnis Indonesia`  
**Headline:**

> **Bisnis berjalan. Semua alurnya tertata.**

**Subheadline:**

> Dari pembelian bahan, produksi, stok, hingga penjualan dan keuangan. Satu sistem yang mengikuti cara kerja bisnis Anda.

**CTA utama:** `Diskusikan kebutuhan`  
**CTA sekunder:** `Lihat solusinya`

**Teks penegas kecil:** `Self-hosted atau private cloud · Instalasi independen per perusahaan`

**Visual:** dashboard konseptual yang memperlihatkan ringkasan penjualan, pesanan aktif, produksi berjalan, nilai persediaan, dan status pekerjaan. Gunakan label **“Ilustrasi tampilan — data contoh”** sampai ada screenshot aplikasi produksi yang benar-benar terverifikasi.

### 5.3 Masalah bisnis

**Judul:**

> **Sudah sibuk kerja. Jangan sibuk cari data.**

Tiga kartu:

1. **“Stoknya ada di mana?”** — Lihat pergerakan barang, bahan, dan stok setiap lokasi dalam satu tempat.
2. **“Produksi sudah sampai mana?”** — Pantau pekerjaan, pemakaian bahan, dan hasil produksi tanpa menebak.
3. **“Sebenarnya untung berapa?”** — Hubungkan transaksi operasional dengan pencatatan biaya dan keuangan.

### 5.4 Modul

**Judul:**

> **Pilih yang bisnis Anda butuhkan.**

**Keterangan:** Modular, saling terhubung, dan bisa disesuaikan dengan proses kerja perusahaan.

| Modul | Deskripsi singkat |
| --- | --- |
| Gudang & Stok | Barang masuk, keluar, transfer, opname |
| Produksi | BOM, pekerjaan, material, dan QC |
| Pembelian | Pengajuan, persetujuan, PO, supplier |
| Penjualan | Penawaran, order, invoice, dan POS |
| Keuangan | Kas, bank, utang, piutang, jurnal |
| Barcode & QR | Scan barang dan pekerjaan lebih cepat |
| Pengiriman | Packing, surat jalan, dan pengiriman |
| Laporan | Data yang membantu keputusan |

Jangan menyebut semua modul *telah tersedia* jika sebagian masih dalam pengembangan. Saat pra-rilis, gunakan framing **“dirancang untuk”** atau cantumkan status modul dengan jelas.

### 5.5 Alur terhubung

**Judul:**

> **Dari pesanan sampai selesai.**

**Keterangan:** Tak perlu memindahkan informasi berkali-kali. Setiap langkah memberi informasi ke bagian berikutnya dengan kontrol yang jelas.

**Urutan visual:**

1. Pesanan diterima.
2. Bahan dan stok diperiksa.
3. Produksi dikerjakan.
4. Barang dikirim.
5. Keuangan diperbarui.

**CTA opsional:** `Cara implementasi`

### 5.6 Industri

**Judul:**

> **Bisnis berbeda. Alur tetap bisa tertata.**

- **Workshop & Manufaktur** — Bahan baku, produksi, QC, dan barang jadi.
- **Konveksi & Produk Custom** — Varian, pesanan, material, dan pengerjaan.
- **Distributor & Retail** — Pembelian, multi-gudang, toko, dan penjualan.

Jangan menambahkan klaim *dipercaya oleh ribuan perusahaan* ataupun logo pelanggan tanpa bukti dan izin.

### 5.7 Implementasi

**Judul:**

> **Server sendiri? Bisa.**

**Keterangan:** NataAlur dirancang untuk dipasang secara mandiri sesuai kebutuhan dan kebijakan perusahaan.

- **Self-hosted / On-premise** — Server atau jaringan perusahaan sendiri.
- **Private Cloud / VPS** — Instalasi dan database khusus perusahaan.
- **Migrasi sistem lama** — Audit data, pemetaan, dan perpindahan terkontrol.

**CTA:** `Konsultasi implementasi`

### 5.8 FAQ

**Apakah NataAlur harus berlangganan SaaS?**  
Tidak. NataAlur dirancang sebagai ERP modular dengan instalasi independen per perusahaan. Skema lisensi dan dukungan disepakati sesuai kebutuhan.

**Apakah bisa digunakan di beberapa toko atau bengkel?**  
Arsitekturnya dirancang mendukung multi-lokasi, pengaturan akses, serta stok per lokasi. Ketersediaan fitur mengikuti ruang lingkup implementasi.

**Bisakah data dari sistem lama dipindahkan?**  
Bisa direncanakan setelah audit struktur data, kualitas stok, dan saldo transaksi. Migrasi harus melalui validasi dan rekonsiliasi.

### 5.9 CTA akhir

**Judul:**

> **Operasional makin jelas. Kerja makin terarah.**

**Keterangan:** Ceritakan alur bisnis Anda. Kita petakan sistem yang benar-benar dibutuhkan.

**Tombol:** `Diskusikan kebutuhan`

### 5.10 Footer

NataAlur · Menata Alur, Menguatkan Usaha.  
Tautan: Fitur · Implementasi · Kontak  
Copyright menggunakan tahun berjalan.

---

## 6. Arah desain visual

### Konsep

- **Odoo-inspired:** fitur dan solusi bisnis terlihat praktis, visual produk jelas.
- **Notion-inspired:** tipografi besar, sederhana, bersih, whitespace cukup, navigasi mudah.
- **NataAlur-owned:** simbol N beralur, biru dan hijau korporat, kartu UI operasional yang realistis.

### Palet awal

| Token | Warna | Pemakaian |
| --- | --- | --- |
| Primary Blue | `#154BA4` | Brand dan aksen penting |
| Primary Green | `#079F77` | CTA sekunder, modul, indikator |
| Ink | `#172B38` | Teks utama |
| Muted | `#64747C` | Teks pendukung |
| Canvas | `#FBFCFB` | Latar halaman |
| Surface | `#FFFFFF` | Kartu |
| Border | `#E6EBE9` | Divider dan border lembut |
| Dark Section | `#182F3B` | Penekanan implementasi |

Kode warna adalah token rancangan prototipe dan dapat diselaraskan dengan file master logo setelah aset vektor disiapkan.

### Tipografi

- Heading: **Manrope** (atau font sans-serif setara).
- Body: **DM Sans** (atau font sans-serif setara).
- Desktop H1: adaptif sekitar 48–82 px; mobile: 40–63 px.
- Body utama: 16–18 px dengan kontras cukup dan line height nyaman.
- Kurangi paragraf panjang; satu kartu maksimal sekitar 1–2 kalimat.

### Aturan visual

- Gunakan screenshot aplikasi nyata setelah siap; selama pra-rilis gunakan mockup **dengan label ilustrasi**.
- Gambar produk/dashboard lebih penting daripada foto orang atau stok kantor generik.
- Jangan memakai terlalu banyak emoji sebagai ikon final. Ganti dengan ikon SVG konsisten.
- Animasi ringan dan mendukung `prefers-reduced-motion`.
- Pertahankan *clear spacing*, responsif, dan navigasi yang jelas pada mobile.
- Logo harus memiliki versi horizontal, stacked, dan simbol/favicon yang konsisten.

---

## 7. Stack dan arsitektur website

**Rekomendasi:** website marketing dibuat terpisah dari aplikasi ERP.

| Lapisan | Rekomendasi |
| --- | --- |
| Landing framework | Astro 7.4 |
| Bahasa | TypeScript untuk komponen interaktif bila diperlukan |
| Styling | CSS modular/design tokens; Tailwind opsional |
| Rendering | Static Site Generation (SSG) |
| Content | Astro Content Collections atau Markdown bila konten bertambah |
| Interaksi | JavaScript minimal, tanpa React kecuali fitur membutuhkan |
| Form kontak | Provider formulir/serverless endpoint atau backend terpisah |
| Hosting | Static hosting (Netlify/Cloudflare Pages) atau Coolify |
| SEO | Metadata, canonical, sitemap, Open Graph, robots.txt |
| ERP utama | Tetap Laravel/Filament/React pada server dan domain aplikasi tersendiri |

**Prinsip:** jangan membangun database hanya untuk landing page statis. PostgreSQL/Neon tidak diperlukan untuk website marketing awal.

### Struktur proyek yang disarankan

```text
nataalur-web/
├── public/
│   ├── assets/
│   │   ├── logo-horizontal.svg
│   │   ├── logo-stacked.svg
│   │   ├── mark.svg
│   │   └── dashboard-preview.webp
│   ├── favicon.svg
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── DashboardPreview.astro
│   │   ├── Problems.astro
│   │   ├── Modules.astro
│   │   ├── Workflow.astro
│   │   ├── Industries.astro
│   │   ├── Deployment.astro
│   │   ├── FAQ.astro
│   │   ├── ContactCTA.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── tokens.css
├── astro.config.mjs
├── package.json
└── README.md
```

Struktur di atas adalah **target refactoring**, bukan klaim bahwa semua komponen terpisah tersebut sudah ada pada prototipe.

---

## 8. CTA dan alur lead

**CTA utama:** `Diskusikan kebutuhan`.

**Alur yang direkomendasikan:** klik → formulir singkat atau kontak aktif → tim menerima inquiry → discovery call → business mapping → usulan implementasi.

Data minimum formulir: nama, perusahaan, kontak, jenis usaha, dan gambaran masalah; jangan meminta informasi sensitif atau detail finansial sejak kontak pertama.

Validasi dan sepakati kanal kontak resmi sebelum peluncuran. **Alamat `halo@nataalur.my.id` dalam prototipe adalah placeholder yang harus dipastikan aktif sebelum dipublikasikan.**

Tambahkan kebijakan privasi ketika mengumpulkan data kontak. Jangan memasang analitik atau pelacakan tanpa mempertimbangkan pemberitahuan dan persetujuan yang berlaku.

---

## 9. SEO dan discoverability

**Usulan title:** `NataAlur — ERP Modular untuk Bisnis Indonesia`.

**Usulan meta description:** `Kelola pembelian, produksi, stok, penjualan, dan keuangan dalam satu alur. NataAlur adalah ERP modular dengan pilihan self-hosted atau private cloud.`

**Kata kunci topikal (diterapkan alami, bukan keyword stuffing):** ERP Indonesia, ERP manufaktur, aplikasi produksi, inventory multi-gudang, ERP workshop, sistem pembelian, ERP self-hosted.

**Ketentuan teknis:**

- Hanya satu H1 utama.
- Hierarki H2/H3 semantik.
- Alt text bermakna untuk gambar informatif.
- OG image dengan identitas NataAlur.
- Canonical URL sesuai domain utama setelah aktif.
- XML sitemap dan `robots.txt`.
- Structured data `Organization`/`SoftwareApplication` hanya untuk fakta yang benar-benar terverifikasi.
- Hindari halaman tipis otomatis dan klaim performa tanpa pengukuran.

---

## 10. Kinerja, aksesibilitas, dan keamanan

**Kinerja:** static-first, gambar WebP/AVIF, dimensi eksplisit untuk mencegah layout shift, lazy loading media di bawah fold, hindari bundel JavaScript tidak perlu.

**Aksesibilitas:** kontras teks, keyboard navigation, fokus terlihat, label formulir, tombol mobile cukup besar, reduced motion, FAQ semantik.

**Keamanan:** HTTPS, header keamanan yang sesuai, form anti-spam/rate limiting pada endpoint, tidak mengekspos kredensial backend, batasi akses sistem ERP dari website publik.

Target teknis ditetapkan dengan audit Lighthouse/Web Vitals aktual, bukan skor yang diada-adakan dalam dokumen.

---

## 11. Acceptance criteria

- [ ] Pengunjung memahami manfaat NataAlur dari hero tanpa harus membaca seluruh halaman.
- [ ] CTA utama berfungsi dan mengarah ke kanal kontak yang aktif.
- [ ] Identitas/logo konsisten pada header, favicon, dan OG image.
- [ ] Layout bekerja baik pada 360 px, 768 px, 1024 px, dan desktop lebar.
- [ ] Tidak ada klaim pengguna, pelanggan, angka revenue, atau fitur sudah rilis tanpa bukti.
- [ ] Mockup data diberi label ilustrasi.
- [ ] Navigasi anchor dan FAQ dapat digunakan dengan keyboard.
- [ ] Halaman memiliki title, description, canonical, OG, sitemap, dan robots.
- [ ] Formulir (jika diaktifkan) memiliki validasi, anti-spam, dan konfirmasi yang jelas.
- [ ] Build Astro berhasil pada environment target.
- [ ] Aplikasi ERP Laravel dan website marketing tetap terpisah.
- [ ] Dokumentasi deployment dan prosedur pembaruan tersedia.

---

## 12. Roadmap website

| Fase | Output |
| --- | --- |
| A — Brand & content | Copy final, aset logo, token warna, tata bahasa |
| B — Landing MVP | Header, hero, solusi, modul, workflow, industri, deployment, FAQ, CTA |
| C — Technical readiness | SEO, performance, analytics, form/kontak, accessibility |
| D — Publication | Domain, HTTPS, sitemap, verifikasi CTA, QA mobile |
| E — Iteration | Uji headline/CTA, konten industri, studi kasus saat sudah ada bukti |

---

## 13. Catatan tentang status produk

NataAlur masih dalam tahap rancangan/pengembangan ERP; karena itu, bahasa promosi harus membedakan **fitur direncanakan**, **fitur tersedia untuk demo**, dan **fitur telah digunakan di produksi**. Contoh angka dashboard, testimonial, nama pelanggan, atau klaim penghematan waktu tidak boleh dipublikasikan sebagai fakta tanpa validasi.

Model NataAlur adalah **ERP modular untuk instalasi mandiri per perusahaan**, bukan layanan SaaS multi-tenant. Website boleh menawarkan diskusi implementasi, tetapi jangan mengiklankan sistem langganan otomatis atau harga paket yang belum ditetapkan.

---

## 14. Referensi aset/prototipe

Prototipe lokal yang menjadi dasar dokumen ini:

- `nataalur-landing/src/pages/index.astro`
- `nataalur-landing/preview.html`
- `nataalur-landing-astro.zip`

Dokumen ini adalah spesifikasi dan brief konten; bukan jaminan bahwa seluruh fungsi, form, atau aplikasi ERP backend telah dibangun. Sebelum rilis, lakukan review oleh pemilik produk dan tim implementasi.
