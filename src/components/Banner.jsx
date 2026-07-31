// banner
//  untuk menampilkan banner besar di halaman utama dengan:
// - Gambar latar belakang yang bisa diganti lewat CMS (hanya ubah url saja)
// - Area bawah banner miring menggunakan clip-path
// - Efek parallax: gambar bergeser saat user scroll (khusus desktop)
// - Overlay gelap agar teks tetap jelas di atas gambar

"use client"; // Agar komponen bisa pakai state/effect di Next.js app router (bukan server only)
import { useEffect, useState, useRef } from "react";

export default function Banner({ imageUrl, title, subtitle }) {
  // Untuk menyimpan offset scroll agar parallax smooth
  const [offset, setOffset] = useState(0);
  const bannerRef = useRef(null); // Untuk referensi elemen DOM banner
  const polygon = "polygon(0 0, 100% 0, 100% 70%, 0 100%)"; // Bentuk miring bawah pakai clipPath CSS

  useEffect(() => {
    // Efek parallax: update offset ketika user scroll
    const handleScroll = () => {
      if (!bannerRef.current) return;
      // Hanya aktif di desktop/tablet (>640px)
      if (window.innerWidth > 640) {
        const scrolled = window.scrollY;
        // LIMIT efek parallax agar gambar tidak naik terlalu tinggi (max 2px aja, biar smooth)
        setOffset(Math.min(scrolled * 0.1, 2)); // max 36px
      }
    };
    // Tambah event scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Bersihkan event saat unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={bannerRef}
      className="relative h-[230px] sm:h-[260px] md:h-[300px] overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Background gambar parallax */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${offset}px)`,
          transition: "transform 0.12s cubic-bezier(.4,0,.2,1)",
          zIndex: 1,
          clipPath: polygon,
        }}
      />
      {/* Overlay: biar tulisan jelas tapi area tetap miring (warna hitam transparan di atas gambar) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "rgba(0,0,0,0.2)", // Overlay gelap tipis
          clipPath: polygon, // Ikuti bentuk miring gambar
        }}
      />
      {/* Teks judul & subjudul di tengah-tengah banner */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-5xl font-bold drop-shadow-md mb-1">{title}</h1>
        <p className="mt-1 text-lg font-medium opacity-80 drop-shadow-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
