import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection>
        <div
          className=" group font-play text-9xl text-transparent hover:text-white"
          style={{
            WebkitTextStroke: "2px white",
          }}
        >
          Welcome To{" "}
          <span className="text-white group-hover:text-transparent group-hover:not-italic italic">
            The Blog
          </span>
        </div>
        <div className="font-mon font-normal tracking-widest text-3xl text-center mt-5">
          <p>We inspire and aspire creativity.</p>
          <p className="mt-3">Stay Hungry Stay Creative</p>
        </div>
      </HeroSection>
    </div>
  );
}
