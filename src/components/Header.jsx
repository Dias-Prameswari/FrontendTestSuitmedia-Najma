// header
// untuk menampilkan navigator bar di bagian paling atas
// ada efek animasi sesuai scrolling, active state

"use client"; // Next.js 13+ directive biar komponen ini berjalan di sisi client (bukan server only)
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // untuk mendapatkan path/url yang sedang aktif
import Link from "next/link"; // routing SPA nextjs

// menu navigasi
const menu = [
  { label: "Work", href: "/work" },   // ini halamannya masih kosong
  { label: "About", href: "/about" },   // ini halamannya masih kosong
  { label: "Services", href: "/services" }, 
  { label: "Ideas", href: "/" },
  { label: "Careers", href: "/careers" },  // ini halamannya masih kosong
  { label: "Contact", href: "/contact" },  // ini halamannya masih kosong
];

export default function Header() {
  // State untuk style header ketika di-scroll, animasi muncul/hilang, dan menyimpan posisi scroll terakhir
  const [scrolled, setScrolled] = useState(false); // true jika sudah di-scroll > 10px
  const [show, setShow] = useState(true); // true = header muncul, false = header hilang ke atas
  const [lastScrollY, setLastScrollY] = useState(0); // posisi scroll sebelumnya
  const pathname = usePathname(); // url path yang sedang aktif
  const [hovered, setHovered] = useState(null); // nama menu yang sedang di-hover
  console.log("Current pathname:", pathname); // untuk melihat hasil spam log saat looping menu

  // Effect: deteksi scroll dan update style header
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10); // header transparan setelah scroll > 10px
          if (window.scrollY < lastScrollY || window.scrollY < 50)
            setShow(true); // scroll ke atas/header di atas, header muncul
          else setShow(false); // scroll ke bawah, header menghilang
          setLastScrollY(window.scrollY); // update posisi scroll
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${show ? "" : "-top-20"}
        ${
          scrolled ? "bg-[#FF6E0E] bg-opacity-90 backdrop-blur" : "bg-[#FF6E0E]"
        }
      `}
      style={{ boxShadow: show ? "0 2px 8px 0 rgba(0,0,0,0.05)" : "none" }}
    >
      {/* Container utama */}
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-6">
        {/* LOGO kiri, file logo svg */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo-2.svg" alt="Suitmedia" className="h-9 w-auto" />
        </Link>
        {/* Menu Navigasi */}
        <nav className="flex space-x-6">
          {menu.map((item) => {
            // Cek: underline aktif jika sedang di-hover atau halaman aktif & tidak sedang hover menu lain
            const isActive = pathname === item.href && !hovered;
            const isHover = hovered === item.label;

            return (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHovered(item.label)} // efek hover: underline pindah
                onMouseLeave={() => setHovered(null)} // efek hover hilang: underline kembali ke menu aktif
                className={`
              relative px-1 text-white font-medium transition
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white
              after:transition-all after:duration-300
              ${isActive || isHover ? "after:w-full font-bold" : "after:w-0"}
            `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
