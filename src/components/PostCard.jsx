// PostCard
// kartu individual untuk satu post/idea/artikel
// - Menampilkan gambar, tanggal, dan judul singkat
// - Dipakai di grid ListPost
// - Gambar otomatis pilih: small, medium, atau placeholder

export default function PostCard({ post }) {
  // Ambil url gambar (prioritas small_image, lalu medium_image, jika tidak ada pakai placeholder)
  // gambar placeholder.jpg ini gambar bunga
  const imgUrl =
    post.small_image?.[0]?.url || 
    post.medium_image?.[0]?.url || 
    "/placeholder.jpg";

  // Format tanggal terbit ke format Indonesia, misal: "17 Juli 2025"
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Gambar utama post */}
      <img
        src={imgUrl}
        alt={post.title}
        className="rounded-lg aspect-[4/3] object-cover  w-full h-40"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.jpg";
        }}
      />
      <div className="p-4 flex-1 flex flex-col">
        {/* Tanggal publish */}
        <span className="text-xs text-gray-500">
          {formatDate(post.published_at)}
        </span>
        {/* Judul artikel */}
        <h3 className="font-semibold text-base mt-1 leading-snug text-gray-800 line-clamp-3">
          {post.title}
        </h3>
      </div>
    </div>
  );
}
