"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import {
  getPostById,
  getCommentsByPostId,
  addCommentToPost,
  deleteCommentFromPost,
  deletePostById,
} from "@/utility/useLocalStorage";
import { useJWT } from "@/utility/useJWT";

export default function SingleBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const postId = Number(id);

  // States for rating stars, hovering stars, post data, comments, user email, and comment input
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  // Load post and its comments on mount or when postId changes
  useEffect(() => {
    const fetchedPost = getPostById(postId);
    if (fetchedPost) {
      setPost(fetchedPost);
      setComments(getCommentsByPostId(postId));
    }
  }, [postId]);

  // Decode user email from JWT token
  useEffect(() => {
    const getEmail = async () => {
      const email = await useJWT.decodeToken();
      setUserEmail(email);
    };
    getEmail();
  }, []);

  // Handle deleting a comment by comment ID
  const handleDeleteComment = (commentId) => {
    deleteCommentFromPost(postId, commentId, userEmail);
    setComments(getCommentsByPostId(postId));
  };

  // Handle submitting a new comment
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    addCommentToPost(postId, commentText, rating, userEmail);
    setComments(getCommentsByPostId(postId));
    setCommentText("");
    setRating(1);
  };

  // Handle deleting the entire post - only admin can do this
  const handleDeletePost = () => {
    if (userEmail !== "admin@gmail.com") return;

    const result = deletePostById(postId, userEmail);
    if (result.success) {
      router.push("/bloglist"); // Redirect to homepage or blog list after deletion
    } else {
      alert(result.message);
    }
  };

  if (!post)
    return <div className="p-6 text-center text-xl">Post not found</div>;

  return (
    <div className="max-w-[1500px] flex mt-25 justify-center gap-5">
      <div>
        <div className="w-[1000px] px-8 py-4 bg-[rgb(24,27,35)] rounded shadow-md border-zinc-700 border-2">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold font-sora">{post.title}</h1>

            {/* Show delete blog only for admin */}
            {userEmail === "admin@gmail.com" && (
              <span
                onClick={handleDeletePost}
                className="text-red-500 font-sora text-xl cursor-pointer hover:underline"
                title="Delete this blog post"
              >
                Delete Blog
              </span>
            )}
          </div>

          <div className="font-sora ml-2 mt-2 text-sm font-light mb-2">
            <span>By admin</span> · <span>July 25, 2025</span>
          </div>

          {post.image && (
            <img
              src={post.image}
              alt="Post Image"
              className="w-[100%] mx-auto max-h-[500px] object-cover rounded"
            />
          )}

          <div
            className="prose max-w-none mt-5 px-7 mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Comments Section */}
        <div className="w-[1000px] mt-2 min-h-52 px-8 py-4 bg-[rgb(24,27,35)] rounded border-zinc-700 border-2">
          <h1 className="text-3xl font-sora font-bold">Comments</h1>

          <div className="flex gap-2 items-center justify-center">
            <div className="relative w-full">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your thoughts about this post"
                className="border-2 mt-5 rounded-xl border-zinc-700 bg-transparent px-3 py-2 w-full text-white"
              />

              <button
                onClick={handleSubmitComment}
                disabled={!userEmail}
                className="absolute right-1 top-[52%] -translate-y-1/2 whitespace-nowrap py-1 text-white border-l-2 border-zinc-700 bg-opacity-10 text-xl px-6 mt-2 backdrop-blur-sm bg-clip-padding disabled:cursor-not-allowed disabled:opacity-40"
              >
                {userEmail ? "Comment" : "Login to comment"}
              </button>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                >
                  <FaStar
                    size={30}
                    className={`cursor-pointer mt-2 transition-colors duration-200 ${
                      (hover || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-white font-sora text-md text-center">
                Rating 5 / {rating}
              </span>
            </div>
          </div>

          {/* Display Comments */}
          <div className="mt-5 space-y-3">
            {comments.length === 0 && (
              <p className="text-gray-400">No comments yet.</p>
            )}
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-t border-gray-700 pt-3 text-white"
              >
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>{comment.email}</span>
                  <span className="flex gap-3 items-center">
                    {new Date(comment.date).toLocaleDateString()} ·{" "}
                    {comment.rating}★
                    {(userEmail === comment.email ||
                      userEmail === "admin@gmail.com") && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:underline text-xs ml-2"
                      >
                        Delete
                      </button>
                    )}
                  </span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[350px] bg-[rgb(24,27,35)] border-2 border-zinc-700 rounded-lg">
        Other Recommended Popular Posts
      </div>
    </div>
  );
}
