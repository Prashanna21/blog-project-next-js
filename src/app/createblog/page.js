"use client";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("/LoginImg.jpg");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Image File:", selectedImage);
  };

  return (
    <div>
      <HeroSection>
        <div className="w-[65vw] max-w-[960px] border-2 border-zinc-700 rounded-xl bg-[rgb(24,27,35)] flex">
          <div className="px-8 py-8 my-auto w-full">
            <h1 className="text-center font-sora text-5xl mb-6">
              Create a new <span className="font-bold">Blog</span>
            </h1>

            <div className="flex flex-col gap-6">
              <div className="text-2xl font-mon tracking-wide">
                <label className="block mb-2">Title:</label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  className="border-2 rounded-xl border-slate-300 bg-transparent px-3 py-2 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="text-2xl font-mon tracking-wide">
                <label className="block mb-2">Content:</label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="bg-white text-black rounded-md"
                />
              </div>

              <div className="text-2xl font-mon tracking-wide">
                <label className="block mb-2">Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-white"
                />
              </div>

              <div className="mt-4">
                <Button text="Submit Blog" onClick={handleSubmit} />
              </div>
            </div>
          </div>

          <div className="border-l-2 border-zinc-700 w-[450px]">
            <Image
              src={imagePreview}
              alt="Preview"
              width={450}
              height={400}
              className="rounded-lg object-cover h-full"
            />
          </div>
        </div>
      </HeroSection>
    </div>
  );
}

export default CreateBlogPage;
