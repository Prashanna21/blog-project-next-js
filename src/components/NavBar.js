"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useJWT } from "@/utility/useJWT";
import { useRouter } from "next/navigation";

function NavBar() {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getEmail = async () => {
      const email = await useJWT.decodeToken();
      setUserEmail(email);
    };
    getEmail();
  }, []);

  const handleLogout = () => {
    useJWT.clearToken();
    setUserEmail(null);
    router.refresh();
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 border-zinc-500 border-b-2 bg-black z-100">
      <div className="max-w-[1500px] mx-auto px-8 py-4 flex justify-between">
        <Link href="/">
          <div className="font-sora text-5xl font-bold italic">The Blog</div>
        </Link>

        <div className="flex gap-12 text-2xl font-sora items-center">
          <Link href="/createblog">
            <div className="cursor-pointer hover:scale-[115%] transition-all duration-200 ease-in-out">
              Create Blog
            </div>
          </Link>

          <Link href="/bloglist">
            <div className="cursor-pointer hover:scale-[115%] transition-all duration-200 ease-in-out">
              Blogs
            </div>
          </Link>

          <Link href="/login">
            <div className="cursor-pointer hover:scale-[115%] transition-all duration-200 ease-in-out">
              {userEmail ? userEmail : "Login"}
            </div>
          </Link>

          {userEmail ? (
            <div
              className="cursor-pointer hover:scale-[115%] transition-all duration-200 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </div>
          ) : (
            <Link href="/signup">
              <div className="cursor-pointer hover:scale-[115%] transition-all duration-200 ease-in-out">
                Sign Up
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
