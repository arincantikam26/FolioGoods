# FolioGoods — UI Edition

Template portfolio sekaligus toko produk digital, dibangun dengan Laravel 13,
Inertia 3, React 19, TypeScript dan Tailwind CSS 4.

Edisi ini berisi **seluruh tampilan publik**: setiap halaman, state dan
interaksi sudah jadi. Data diambil dari file TypeScript (mock), dan transaksi
disimulasikan. Tidak ada panel admin, database produk, pembayaran nyata, atau
pengiriman email di edisi ini.

> Teks antarmuka bawaan berbahasa Inggris. Semua teks ada di satu file
> (`resources/js/content/copy.ts`), jadi mudah diterjemahkan.

---

## Isi paket

| Area | Halaman |
| --- | --- |
| Portfolio | Beranda, daftar karya dengan filter, studi kasus panjang |
| Toko | Katalog dengan filter dan urutan, detail produk |
| Transaksi (mock) | Checkout, instruksi pembayaran, cek pesanan, status pesanan |
| Profil | About, form kontak |
| Dokumen | Privacy, terms, license (teks contoh) |
| Sistem | Halaman 404 dan 500, plus rute pratinjau lokal |

Juga termasuk:

- Dua preset tema: `porcelain` (terang) dan `nocturne` (gelap)
- Server-side rendering (SSR) siap pakai
- Mode portfolio saja (`FOLIO_COMMERCE=false`)
- Pengalih **Preview state** untuk meninjau semua state transaksi
- Aksesibilitas target WCAG 2.2 AA
- Test fitur untuk semua rute publik
- Dokumentasi lengkap di `docs/ui-edition/` (bahasa Inggris)

## Kebutuhan

- PHP 8.3 atau lebih baru, dengan Composer
- Node.js 20 atau lebih baru, dengan npm
- Ekstensi PHP `pdo_sqlite` (bawaan untuk database SQLite default)
- Koneksi internet saat build pertama (font diunduh sekali dari Bunny Fonts,
  lalu disajikan dari domain Anda sendiri)

## Instalasi

1. Ekstrak ZIP, lalu buka folder hasil ekstrak di terminal.

2. Jalankan perintah setup:

   ```bash
   composer install
   cp .env.example .env          # Windows (PowerShell): copy .env.example .env
   php artisan key:generate
   php artisan migrate           # jawab "yes" bila diminta membuat database.sqlite
   npm install
   ```

   Atau sekaligus dengan satu perintah:

   ```bash
   composer run setup
   ```

3. Jalankan server pengembangan:

   ```bash
   composer dev
   ```

   Atau di dua terminal terpisah:

   ```bash
   php artisan serve
   npm run dev
   ```

4. Buka <http://localhost:8000>.

Situs publik ada di `/`. Login dan dashboard bawaan starter kit Laravel tetap
ada di `/login` dan `/dashboard`.

## Langkah pertama setelah instalasi

Ganti isi berikut sebelum mengubah hal lain. Komponen tidak menyimpan nama,
warna, URL atau teks secara langsung, jadi cukup ubah file data.

| Yang diubah | File |
| --- | --- |
| Nama situs, pemilik, email, media sosial, SEO | `resources/js/content/site.ts` |
| Halaman About (bio, foto, pengalaman, CV) | `resources/js/features/profile/data/profile.ts` |
| Proyek portfolio | `resources/js/features/portfolio/data/projects.ts` |
| Produk di toko | `resources/js/features/products/data/products.ts` |
| Kategori dan lisensi produk | `resources/js/features/products/data/catalogue.ts` |
| Rekening untuk instruksi pembayaran | `resources/js/features/payment/data/bank.ts` |
| Semua teks tombol dan antarmuka | `resources/js/content/copy.ts` |
| Mata uang, tanggal, zona waktu, gaya bahasa | `resources/js/app/configuration/site-config.ts` |
| Warna | `resources/css/site/tokens.css` |
| Font | `vite.config.ts` dan `resources/views/site.blade.php` |

Gambar contoh berupa SVG di `public/folio/media`. Ganti dengan JPG, WebP atau
AVIF milik Anda, lalu perbarui path di file data. Setiap gambar wajib punya
`alt`, `width` dan `height`.

Setelah mengubah data, jalankan `npm run types:check`. Jika ada field wajib
yang terlewat, perintah ini akan memberi tahu sebelum masuk ke browser.

Panduan lengkap: [Customization](docs/ui-edition/customization.md),
[Content guide](docs/ui-edition/content-guide.md),
[Theme tokens](docs/ui-edition/theme-tokens.md).

## Pengaturan `.env`

| Variabel | Default | Fungsi |
| --- | --- | --- |
| `FOLIO_THEME` | `porcelain` | Preset tema. `nocturne` untuk tema gelap. |
| `FOLIO_UI_PREVIEWS` | `true` bila `APP_ENV=local` | Mengaktifkan `/404-preview`, `/500-preview` dan pengalih **Preview state**. Matikan di production. |
| `FOLIO_COMMERCE` | `true` | `false` menghapus rute toko, checkout, pembayaran dan pesanan, serta menyembunyikan tautannya. |
| `APP_URL` | — | Dipakai untuk URL kanonik dan gambar Open Graph. Isi dengan domain asli. |

## Meninjau semua state

Dengan pratinjau aktif, halaman transaksi menampilkan pilihan **Preview
state**. Contoh:

- `/checkout?product=folio-editorial&state=price_changed`
- `/payment?order=FG-2610-4821&state=rejected`
- `/order-status/FG-2610-4821?state=fulfilled`
- `/contact?state=failed`

## Build untuk production

```bash
npm run build              # bundle client
npm run build:ssr          # bundle client + server rendering
php artisan inertia:start-ssr   # menjalankan server SSR di production
```

Di `.env` production, atur `APP_ENV=production`, `APP_DEBUG=false`, dan
`APP_URL` sesuai domain.

## Pemeriksaan

```bash
npm run types:check        # cek tipe TypeScript
npm run check              # format + lint
php artisan test           # test fitur, termasuk semua rute publik
```

## Struktur folder

```text
app/Http/Controllers/Site/     Controller rute publik
config/folio.php               Pengaturan tema, pratinjau, commerce
routes/site.php                Semua rute publik
resources/
├── css/site/                  Token warna, tipografi, motion
├── views/site.blade.php       Kerangka HTML situs publik
└── js/
    ├── content/               Identitas situs, semua teks UI, navigasi
    ├── app/configuration/     Mata uang, tanggal, motion, gaya bahasa
    ├── components/            Komponen dasar dan layout
    ├── features/              portfolio, products, checkout, payment, orders, …
    ├── layouts/site/          PublicLayout, TransactionLayout, LegalLayout
    └── pages/site/            Satu file per rute
public/folio/                  Gambar contoh dan gambar Open Graph
docs/ui-edition/               Dokumentasi lengkap
```

Detail arsitektur dan cara menyambungkan ke backend sungguhan ada di
[Page structure](docs/ui-edition/page-structure.md).

## Masalah umum

**`npm run dev` jalan tapi halaman kosong atau error Vite manifest.**
Pastikan `npm run dev` tetap berjalan, atau jalankan `npm run build` sekali.

**`Database file does not exist`.**
Buat file kosong `database/database.sqlite`, lalu jalankan
`php artisan migrate` lagi.

**Font tidak muncul saat build.**
Build pertama butuh koneksi internet untuk mengunduh font. Setelah itu font
disimpan dan disajikan dari server Anda.

**Pengalih Preview state muncul di situs live.**
Set `FOLIO_UI_PREVIEWS=false` dan `APP_ENV=production` di `.env`.

## Lisensi

Lihat [LICENSE.txt](LICENSE.txt). Ringkasnya: satu pembelian untuk satu
proyek, pribadi atau komersial. Template dan source code tidak boleh dijual
ulang atau dibagikan sebagai template.

Pihak ketiga mengikuti lisensinya masing-masing: Laravel dan React starter
kit (MIT), Lucide (ISC), Radix UI (MIT), font Newsreader dan Hanken Grotesk
(SIL Open Font License).

## Dukungan

Pertanyaan instalasi dan bug pada template bisa dikirim lewat kontak di
halaman produk. Dukungan tidak mencakup kustomisasi, pembuatan fitur baru,
atau penyambungan ke backend.
