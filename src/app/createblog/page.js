"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";

import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";

import Underline from "@tiptap/extension-underline";
import { savePost, getAllPosts } from "@/utility/useLocalStorage";
import { useRouter } from "next/navigation";

import { useAuthGuard } from "@/utility/useAuthGuard";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const baseBtn =
    "px-4 py-1 rounded-md hover:bg-slate-600 border-slate-500 border-2";

  const handleHeadingChange = (e) => {
    const level = parseInt(e.target.value);
    if (!isNaN(level)) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <div className="flex gap-2 mb-4 flex-wrap items-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={baseBtn}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={baseBtn}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={baseBtn}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={baseBtn}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={baseBtn}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={baseBtn}
      >
        Quote
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={baseBtn}
      >
        Paragraph
      </button>
      <select
        onChange={handleHeadingChange}
        defaultValue=""
        className="px-4 py-1 rounded-md border-slate-500 border-2  text-white bg-slate-600 cursor-pointer"
      >
        <option value="" disabled className="text-white">
          Heading
        </option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
        <option value="5">H5</option>
        <option value="6">H6</option>
      </select>
    </div>
  );
};

export default function CreateBlogPage() {
  const { loading, email } = useAuthGuard({ adminOnly: true });

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension, Underline],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "ProseMirror",
      },
    },
  });

  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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
    if (!mounted || !editor) {
      console.warn("Editor not ready");
      return;
    }

    const newPost = {
      title,
      content: editor.getHTML(),
      image: imagePreview,
      createdAt: new Date().toISOString(),
    };

    const result = savePost(newPost);
    console.log(getAllPosts());

    router.push(`/singleblogpage/${getAllPosts().length}`);

    console.log(result.message);
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <HeroSection>
        <div className="w-[65vw] max-w-[1200px] mt-6 border-2 border-zinc-700 rounded-xl bg-[rgb(24,27,35)] flex">
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
                  className="border-2 rounded-xl border-slate-300 bg-transparent px-3 py-2 w-full text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="text-2xl font-mon tracking-wide">
                <label className="block mb-2">Content:</label>
                {mounted && <MenuBar editor={editor} />}
                <div className="bg-white text-black rounded-md w-[550px] h-[300px] overflow-auto p-2">
                  {mounted && editor && (
                    <EditorContent
                      editor={editor}
                      className="w-full h-full outline-none border-none focus:outline-none focus:border-none"
                    />
                  )}
                </div>
              </div>

              <div className="text-2xl font-mon tracking-wide">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileUpload"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("fileUpload").click()
                    }
                    className="px-4 py-1 rounded-md hover:bg-slate-600 border-slate-500 border-2 text-white"
                  >
                    Upload Image
                  </button>
                  {selectedImage && (
                    <span className="ml-4 text-white text-sm italic">
                      {selectedImage.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Button text="Submit Blog" onClick={handleSubmit} />
              </div>
            </div>
          </div>

          <div className="border-l-2 border-zinc-700 w-[650px] flex items-center justify-center p-2">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                width={450}
                height={400}
                className="rounded-lg object-cover h-full"
              />
            ) : (
              <div className="text-white text-center text-lg">
                No image selected
              </div>
            )}
          </div>
        </div>
      </HeroSection>
    </div>
  );
}
