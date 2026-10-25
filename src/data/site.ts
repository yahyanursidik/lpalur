export const site = {
  name: 'NataAlur',
  url: 'https://nataalur.my.id',
  title: 'NataAlur — ERP Modular untuk Bisnis Indonesia',
  description:
    'Kelola pembelian, produksi, stok, penjualan, dan keuangan dalam satu alur. NataAlur adalah ERP modular dengan pilihan self-hosted atau private cloud.',
  tagline: 'Menata Alur, Menguatkan Usaha.',
  // Placeholder — pastikan kanal ini aktif sebelum dipublikasikan.
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'halo@nataalur.my.id',
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
};

export type IconName =
  | 'package' | 'factory' | 'cart' | 'receipt' | 'wallet' | 'qr' | 'truck' | 'chart'
  | 'pin' | 'activity' | 'coins' | 'arrow' | 'check' | 'chevron' | 'menu' | 'x'
  | 'server' | 'cloud' | 'migrate' | 'shirt' | 'store' | 'wrench' | 'clipboard'
  | 'shield' | 'database' | 'message' | 'search' | 'layers' | 'inbox' | 'clipcheck'
  | 'book' | 'users' | 'lock' | 'up' | 'mail' | 'route' | 'building' | 'bell' | 'plus';

export interface Module {
  id: string;
  name: string;
  desc: string;
  icon: IconName;
  hue: string;
  links: string[];
}

export const modules: Module[] = [
  { id: 'gudang', name: 'Gudang & Stok', desc: 'Barang masuk, keluar, transfer, opname.', icon: 'package', hue: '#154BA4', links: ['pembelian', 'produksi', 'penjualan', 'barcode', 'pengiriman'] },
  { id: 'produksi', name: 'Produksi', desc: 'BOM, pekerjaan, material, dan QC.', icon: 'factory', hue: '#079F77', links: ['gudang', 'pembelian', 'barcode', 'laporan'] },
  { id: 'pembelian', name: 'Pembelian', desc: 'Pengajuan, persetujuan, PO, supplier.', icon: 'cart', hue: '#0E8FA3', links: ['gudang', 'keuangan', 'produksi'] },
  { id: 'penjualan', name: 'Penjualan', desc: 'Penawaran, order, invoice, dan POS.', icon: 'receipt', hue: '#D9822B', links: ['gudang', 'pengiriman', 'keuangan'] },
  { id: 'keuangan', name: 'Keuangan', desc: 'Kas, bank, utang, piutang, jurnal.', icon: 'wallet', hue: '#7A5AF8', links: ['penjualan', 'pembelian', 'laporan'] },
  { id: 'barcode', name: 'Barcode & QR', desc: 'Scan barang dan pekerjaan lebih cepat.', icon: 'qr', hue: '#172B38', links: ['gudang', 'produksi', 'pengiriman'] },
  { id: 'pengiriman', name: 'Pengiriman', desc: 'Packing, surat jalan, dan pengiriman.', icon: 'truck', hue: '#E0517A', links: ['penjualan', 'gudang', 'barcode'] },
  { id: 'laporan', name: 'Laporan', desc: 'Data yang membantu keputusan.', icon: 'chart', hue: '#2C7BE5', links: ['keuangan', 'produksi', 'penjualan', 'gudang'] },
];

export const nav = [
  { label: 'Solusi', href: '#solusi', menu: 'solusi' },
  { label: 'Fitur', href: '#fitur', menu: 'fitur' },
  { label: 'Industri', href: '#industri' },
  { label: 'Implementasi', href: '#implementasi' },
] as const;

export const problems = [
  { q: 'Stoknya ada di mana?', a: 'Lihat pergerakan barang, bahan, dan stok setiap lokasi dalam satu tempat.', icon: 'pin' as IconName },
  { q: 'Produksi sudah sampai mana?', a: 'Pantau pekerjaan, pemakaian bahan, dan hasil produksi tanpa menebak.', icon: 'activity' as IconName },
  { q: 'Sebenarnya untung berapa?', a: 'Hubungkan transaksi operasional dengan pencatatan biaya dan keuangan.', icon: 'coins' as IconName },
];

export const industries = [
  {
    id: 'manufaktur',
    name: 'Workshop & Manufaktur',
    short: 'Workshop',
    desc: 'Bahan baku, produksi, QC, dan barang jadi.',
    icon: 'wrench' as IconName,
    points: ['Kebutuhan material per pekerjaan', 'Progres produksi dan QC', 'Stok bahan baku dan barang jadi'],
  },
  {
    id: 'konveksi',
    name: 'Konveksi & Produk Custom',
    short: 'Konveksi',
    desc: 'Varian, pesanan, material, dan pengerjaan.',
    icon: 'shirt' as IconName,
    points: ['Varian ukuran, warna, dan model', 'Pesanan custom dari pelanggan', 'Pemakaian kain dan aksesori'],
  },
  {
    id: 'distributor',
    name: 'Distributor & Retail',
    short: 'Distributor',
    desc: 'Pembelian, multi-gudang, toko, dan penjualan.',
    icon: 'store' as IconName,
    points: ['Stok per gudang dan toko', 'Pembelian dan reorder', 'Penjualan dan POS per lokasi'],
  },
];

export const faqs = [
  {
    q: 'Apakah NataAlur harus berlangganan SaaS?',
    a: 'Tidak. NataAlur dirancang sebagai ERP modular dengan instalasi independen per perusahaan. Skema lisensi dan dukungan disepakati sesuai kebutuhan.',
  },
  {
    q: 'Apakah bisa digunakan di beberapa toko atau bengkel?',
    a: 'Arsitekturnya dirancang mendukung multi-lokasi, pengaturan akses, serta stok per lokasi. Ketersediaan fitur mengikuti ruang lingkup implementasi.',
  },
  {
    q: 'Bisakah data dari sistem lama dipindahkan?',
    a: 'Bisa direncanakan setelah audit struktur data, kualitas stok, dan saldo transaksi. Migrasi harus melalui validasi dan rekonsiliasi.',
  },
  {
    q: 'Apakah semua modul wajib dipakai sekaligus?',
    a: 'Tidak. Modul dipilih sesuai kebutuhan dan ruang lingkup yang disepakati saat pemetaan proses bisnis, lalu dapat dikembangkan bertahap.',
  },
  {
    q: 'Di mana data perusahaan disimpan?',
    a: 'Di server milik perusahaan (self-hosted) atau private cloud/VPS dengan database khusus perusahaan, sesuai model instalasi yang dipilih.',
  },
];
