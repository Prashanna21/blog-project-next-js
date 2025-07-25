"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllPosts } from "@/utility/useLocalStorage"; // adjust path as needed
import { useRouter } from "next/navigation";

function Page() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const allPosts = getAllPosts();
    console.log(allPosts);
    setPosts(allPosts);
  }, []);

  return (
    <div className="max-w-[1500px] flex mt-25 justify-center gap-5">
      <div>
        <h1 className="font-sora tracking-wide text-3xl font-bold text-center mb-3">
          Recent Blogs
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 min-w-[1000px]">
            No posts found.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="min-w-[1000px] mb-4 px-4 py-4 bg-[rgb(24,27,35)] rounded shadow-md border-zinc-700 border-2 cursor-pointer hover:bg-[rgb(28,31,40)] transition"
              onClick={() => router.push(`/singleblogpage/${post.id}`)}
            >
              <div className="flex gap-5 font-sora">
                <div>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={150}
                      height={150}
                      className="w-[150px] h-[150px] object-cover rounded"
                    />
                  )}
                </div>

                <div className="mt-4">
                  <h1 className="text-3xl font-bold">{post.title}</h1>
                  <div
                    className="text-gray-400 mt-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-[350px] bg-[rgb(24,27,35)] border-2 border-zinc-700 rounded-lg p-4">
        Other Recommended Popular Posts
      </div>
    </div>
  );
}

export default Page;
