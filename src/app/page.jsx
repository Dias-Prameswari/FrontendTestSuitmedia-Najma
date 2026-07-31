// page (Home Page)
// Halaman utama website ("/")
// - Menampilkan Header (navigasi), Banner, dan daftar postingan (ListPost)
// - Banner bisa custom gambar, judul, dan subjudul lewat props
// - Konten utama di <main> (daftar artikel dengan pagination/filtering)
"use client";
import { Suspense } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import dynamic from "next/dynamic";
const ListPost = dynamic(() => import("@/components/ListPost"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Komponen header (navigasi paling atas) */}
      <Header />

      {/* Komponen banner besar di atas konten */}
      <Banner
        // gambar diambil dari web unsplash, gambarnya tentang simbol abstrak
        imageUrl="https://images.unsplash.com/photo-1608792992053-f397e328a56d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Ideas"
        subtitle="Where all our great things begin"
      />

      {/* Konten utama: daftar post */}
      <main className="max-w-6xl mx-auto px-4 bg-white">
        {/* Bungkus ListPost dengan Suspense */}
        {/* <Suspense fallback={<div>Loading post...</div>}> */}
          <ListPost />
        {/* </Suspense> */}
      </main>
    </div>
  );
}
