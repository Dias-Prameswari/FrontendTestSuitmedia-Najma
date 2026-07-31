// Pagination
//  navigasi halaman (pagination) yang tampil di bawah daftar post
// - Tombol: first, prev, page numbers, next, last
// - Mendukung disable tombol jika di halaman pertama/terakhir
// - Hanya tampilkan max 5 page button (dinamis)
// - Panggil fungsi onPageChange jika user klik tombol

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"; // Icon panah dari lucide-react

export default function Pagination({ page, totalPages, onPageChange }) {
  const maxButtons = 5; // Maksimal jumlah button page yang tampil
  let start = Math.max(1, page - 2); // Nomor page awal yang tampil
  let end = Math.min(totalPages, start + maxButtons - 1); // Nomor page akhir

  // Koreksi jika halaman di ujung, biar tetap 5 button
  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1);
  }

  // Buat array nomor page yang akan ditampilkan
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-2">
        {/* First page button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={`p-0.5 rounded-full border-2 flex items-center justify-center w-9 h-9 ${
            page === 1
              ? "text-gray-300 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-orange-50"
          }`}
        >
          <ChevronsLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        {/* Previous page button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`p-0.5 rounded-full border-2 flex items-center justify-center w-9 h-9 ${
            page === 1
              ? "text-gray-300 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-orange-50"
          }`}
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        {/* Ellipsis di depan jika ada halaman tersembunyi */}
        {start > 1 && <span className="px-1">...</span>}

        {/* Button nomor halaman */}
        {pages.map((i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`rounded-full border-2 flex items-center justify-center w-9 h-9 transition ${
              i === page
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
            }`}
          >
            {i}
          </button>
        ))}

        {/* Ellipsis di belakang jika ada halaman tersembunyi */}
        {end < totalPages && <span className="px-1">...</span>}

        {/* Next page button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`p-0.5 rounded-full border-2 flex items-center justify-center w-9 h-9 ${
            page === totalPages
              ? "text-gray-300 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-orange-50"
          }`}
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
        {/* Last page button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className={`p-0.5 rounded-full border-2 flex items-center justify-center w-9 h-9 ${
            page === totalPages
              ? "text-gray-300 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-orange-50"
          }`}
        >
          <ChevronsRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
