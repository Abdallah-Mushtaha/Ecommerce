import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([
    { id: 1, txt: "Amazing article!" },
    { id: 2, txt: "Thanks for the information." },
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    setComments([...comments, { id: Date.now(), txt: newComment }]);
    setNewComment("");
  };

  if (loading) {
    return (
      <div className="mt-52 container mx-auto px-4 flex flex-col lg:flex-row gap-8 animate-pulse">
        {/* Sidebar */}
        <aside className="w-full lg:w-[300px] space-y-8 border rounded-md p-4 h-fit">
          <div className="h-8 bg-gray-300 rounded w-2/3" />
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-6 bg-gray-300 rounded w-4/5" />
        </aside>

        {/* Main skeleton */}
        <div className="flex-1">
          <div className="mb-5 h-10 bg-gray-300 rounded-full w-24" />
          <div className="rounded-lg overflow-hidden mb-6 h-[350px] bg-gray-300" />

          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-6" />

          <div className="space-y-4">
            <div className="h-4 bg-gray-300 w-full rounded" />
            <div className="h-4 bg-gray-300 w-5/6 rounded" />
            <div className="h-4 bg-gray-300 w-4/6 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center mt-40">Blog Not Found</div>;
  }

  return (
    <div className="mt-52 container mx-auto px-4 flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-[300px] space-y-8 border rounded-md p-4 h-fit">
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
          <ul className="space-y-1 text-gray-600 text-sm">
            <li>- Technology</li>
            <li>- Business</li>
            <li>- Lifestyle</li>
          </ul>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
        >
          <IoIosArrowBack />
        </button>

        <div className="rounded-lg overflow-hidden mb-6">
          <img
            src={`https://picsum.photos/seed/blog-${blog.id}/1200/500`}
            alt={blog.title}
            className="w-full h-[350px] object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4 capitalize">{blog.title}</h1>
        <p className="text-gray-600 mb-6">Author: John Doe — ID #{blog.id}</p>

        <div className="space-y-6 leading-8 text-gray-700">
          <p>{blog.body}</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="space-y-3 mb-6">
            {comments.map((c) => (
              <div key={c.id} className="border rounded p-3 bg-gray-50">
                {c.txt}
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              placeholder="Add comment..."
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-main text-white rounded"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
