# Suitmedia Frontend Test

Proyek Frontend untuk Suitmedia menggunakan Next.js dan TailwindCSS.

## Deskripsi Proyek

- Menggunakan Next.js App Router (React Server Components + Client Components).
- Menggunakan TailwindCSS untuk styling.
- Memiliki fitur header dengan navigasi yang responsif dan animasi scroll.
- Halaman utama menampilkan banner dan daftar postingan dengan pagination, sorting, dan filter.
- Data postingan diambil dari API backend Suitmedia.
- Mendukung dynamic routing dan state URL (query params).

## Struktur Folder Penting

- `src/app` - Folder utama berisi halaman (pages) dan routing.
- `src/components` - Komponen React yang digunakan pada halaman.
- `src/components/ui` - Komponen UI seperti Select dropdown.
- `public` - Folder berisi aset statis seperti gambar logo.

## Cara Menjalankan

1. Clone repository ini
2. Masuk ke folder proyek: `cd FrontendTestSuitmedia-Najma`
3. Install dependencies: `npm install`
4. Jalankan mode development: `npm run dev`
5. Jalankan build production: `npm run build`

## Penjelasan Komponen Utama

1. **Header** — Menampilkan navigasi utama dengan animasi saat scroll dan indikator halaman aktif
2. **Banner** — Menampilkan gambar banner dengan efek parallax dan overlay warna
3. **ListPost** — Menampilkan daftar postingan dari API dengan pagination, filter ukuran halaman, dan sorting
4. **Pagination** — Komponen pagination untuk navigasi halaman postingan
5. **PostCard** — Menampilkan kartu postingan dengan gambar, tanggal, dan judul

## Konfigurasi API & Proxy

Data postingan diambil dari:
`https://suitmedia-backend.suitdev.com/api/ideas`

Request ke API ini tidak dipanggil langsung dari client (browser), melainkan melalui proxy yang dikonfigurasi di `next.config.mjs` (`rewrites()`), yang meneruskan semua request `/api/*` ke backend Suitmedia dari sisi server. Ini diperlukan agar request tidak diblokir oleh browser (CORS).

### Catatan: Gambar dari API

Sebagian/seluruh gambar (`small_image`, `medium_image`) yang dikembalikan API saat ini mengembalikan `Access Denied` dari asset host Suitmedia (`assets.suitdev.com`), di luar kendali aplikasi frontend ini — bisa diverifikasi langsung dengan membuka URL gambar tersebut di tab baru. Data (judul, tanggal, pagination, sorting) tetap berfungsi normal karena berasal dari endpoint JSON yang berbeda. UI menangani kondisi ini secara graceful dengan fallback otomatis ke placeholder image via `onError`.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
