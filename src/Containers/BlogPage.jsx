import React, { useEffect, useState } from "react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const BLOG_API = "https://dummyjson.com/posts?limit=6";

  useEffect(() => {
    fetch(BLOG_API)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 mt-40">
      <h1 className="text-4xl font-bold mb-4 text-center">Our Blog</h1>
      <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        Explore tips, stories, and ideas from our team to help you shop smarter
        and discover new trends.
      </p>

      {loading ? (
        <div className="text-center text-gray-400 flex items-center justify-center">
          <div class="relative flex w-64 animate-pulse gap-2 p-4">
            <div class="flex-1">
              <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
              <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
            </div>
            <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={`https://picsum.photos/seed/blog-${post.id}/600/400`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-400 mb-1">Post #{post.id}</p>
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
                <a
                  href={`https://example.com`}
                  target="_blank"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
