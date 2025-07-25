"use client";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { saveUserCredential } from "@/utility/useLocalStorage";
import { useRouter } from "next/navigation";

function page() {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const router = useRouter();
  const [status, setStatus] = useState(null);

  const handleSignUp = () => {
    const obj = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    let data = saveUserCredential(obj);
    setStatus(data.message);

    if (data.success === true) {
      router.push("/login");
    }
  };

  return (
    <div>
      <HeroSection>
        <div className="w-[65vw] max-w-[1000px] border-2  border-zinc-700 rounded-xl bg-[rgb(24,27,35)] flex">
          <div className=" px-8 py-8 my-auto">
            <h1 className="text-center font-sora text-5xl">
              Sign Up to{" "}
              <span className="font-sora text-5xl font-bold italic">
                The Blog
              </span>
            </h1>

            <div className="flex flex-col gap-8 mt-10 items-start">
              <div
                className="text-2xl font-mon tracking-wide flex items-center gap-2 w-full
              "
              >
                <span>Email: </span>
                <input
                  ref={emailInputRef}
                  type="text"
                  placeholder="youremail@gmail.com"
                  className="border-2 rounded-xl border-slate-300 bg-transparent  px-2 py-1 w-full"
                />
              </div>
              <div className="text-2xl font-mon tracking-wide flex items-center gap-2 w-full">
                <span>Password: </span>
                <input
                  ref={passwordInputRef}
                  type="password"
                  placeholder="****************"
                  className="border-2 rounded-xl border-slate-300 bg-transparent w-full px-2 py-1"
                />
              </div>

              {status && (
                <span className="font-sora -my-4 text-zinc-500 self-center">
                  {status}
                </span>
              )}

              <span className="font-sora text-zinc-500 self-center">
                Already have an account?{" "}
                <Link href="/login" className="text-white">
                  Login here
                </Link>
              </span>

              <div className="self-center">
                <div onClick={handleSignUp}>
                  <Button text="Sign Up" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-zinc-700 w-[450px]">
            <Image
              src="/LoginImg.jpg"
              alt="Hero background"
              width={450}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </HeroSection>
    </div>
  );
}

export default page;
