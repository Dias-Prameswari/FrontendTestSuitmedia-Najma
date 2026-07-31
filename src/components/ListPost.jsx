// ListPost
//  untuk menampilkan daftar artikel/ide dari API Suitmedia
// - Mendukung filter "show per page", sorting, dan pagination
// - Data dinamis, mengambil langsung dari backend/API
// - Query param (URL) akan update saat user mengubah filter/pagination
// - Render PostCard untuk tiap data
// - Ada loading state dan error state jika data kosong/error

"use client"; // Agar komponen bisa pakai state/effect di Next.js app router (bukan server only)
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import PostCard from "./PostCard"; //ambil gambar dari file postcard
import Pagination from "./Pagination"; //file untuk code page kanan kiri
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // manggil icon

// Endpoint backend untuk daftar ideas
const API_URL = "/api/ideas";

export default function ListPost() {
  //  Hooks untuk routing dan url params
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil parameter page, size, sort dari url (query param)
  const pageFromUrl = Number(searchParams.get("page[number]")) || 1;
  const sizeFromUrl = Number(searchParams.get("page[size]")) || 10;
  const sortFromUrl = searchParams.get("sort") || "-published_at";

  //  Local state untuk filter
  const [page, setPage] = useState(pageFromUrl);
  const [size, setSize] = useState(sizeFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  //  Data & loading state
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  //  Handler perubahan filter & sort
  const handlePageChange = useCallback((val) => setPage(val), []);
  const handleSizeChange = useCallback((val) => setSize(Number(val)), []);
  const handleSortChange = useCallback((val) => setSort(val), []);

  //  Sync state dengan url param (biar bisa back/forward)
  useEffect(() => {
    setPage(pageFromUrl);
    setSize(sizeFromUrl);
    setSort(sortFromUrl);
  }, [searchParams, pageFromUrl, sizeFromUrl, sortFromUrl]);

  //  Update url param jika filter berubah (tanpa reload)
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page[number]", page);
    params.set("page[size]", size);
    params.set("sort", sort);
    router.replace(`?${params.toString()}`);
  }, [page, size, sort, router]);

  //  Ambil data dari API setiap filter berubah
  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`,
      { headers: { Accept: "application/json" } }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data || !data.meta) {
          setPosts([]);
          setTotal(0);
          setLoading(false);
          return;
        }
        setPosts(data.data);
        setTotal(data.meta.total);
        setLoading(false);
      });
  }, [page, size, sort]);

  return (
    <div className="mt-10 px-4 md:px-14">
      {/* Filter info dan sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 md:gap-0">
        <div className="text-sm text-[#212121] font-semibold mb-2 md:mb-0">
          {/* Info jumlah item */}
          Showing {(page - 1) * size + 1} - {Math.min(page * size, total)} of{" "}
          {total}
        </div>
        <div className="flex justify-center gap-6">
          <div className="flex gap-2 items-center">
            {/* Filter: size */}
            <label className="text-sm font-semibold text-[#212121]">
              Show per page:
            </label>
            <Select value={String(size)} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-32 rounded-full border-2 border-gray-300 font-semibold">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter: sort */}
            <label className="text-sm font-semibold text-[#212121]">
              Sort by:
            </label>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40 rounded-full border-2 border-gray-300 font-semibold">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-published_at">Newest</SelectItem>
                <SelectItem value="published_at">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid daftar post */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 pb-8">
        {loading ? (
          <div className="col-span-full text-center py-12">Loading...</div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center mt-8">
        <Pagination
          page={page}
          totalPages={Math.ceil(total / size)}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Error/no data */}
      {!loading && posts.length === 0 && (
        <div className="col-span-full text-center py-12 text-red-600">
          No data found or API error.
        </div>
      )}
    </div>
  );
}
