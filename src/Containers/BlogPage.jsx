import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 9;
  const totalPages = 5;

  const fetchBlogs = (pageNumber) => {
    setLoading(true);
    const skip = (pageNumber - 1) * limit;
    fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.posts);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="mt-52 container mx-auto px-4 ">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Blog</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-[280px] border rounded-md p-4 space-y-8 h-fit">
          <div>
            <h4 className="font-bold mb-2">Search</h4>
            <input
              type="text"
              placeholder="Search..."
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <h4 className="font-bold mb-2">Categories</h4>
            <ul className="space-y-1 text-gray-600">
              <li>- Technology</li>
              <li>- Business</li>
              <li>- Lifestyle</li>
              <li>- Travel</li>
              <li>- Fashion</li>
            </ul>
          </div>
        </aside>

        {/* BLOG LIST */}
        <div className="flex-1">
          <div
            key={page}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300"
            style={{ opacity: loading ? 0.3 : 1 }}
          >
            {loading
              ? Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-[250px] bg-gray-200 animate-pulse rounded-md"
                  ></div>
                ))
              : blogs.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                  >
                    <img
                      src={`https://picsum.photos/seed/blog-${post.id}/600/400`}
                      alt=""
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-gray-400 text-sm mb-1">
                        #{post.id} – {post.tags[0]}
                      </p>
                      <h3 className="font-bold mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">{post.body}</p>
                    </div>
                  </div>
                ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPage(index + 1);
                }}
                className={`px-4 py-2 rounded border ${
                  page === index + 1
                    ? "bg-main text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
