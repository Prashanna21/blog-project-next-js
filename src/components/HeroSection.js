import React from "react";
import ParticlesComponent from "@/components/Particles";

function HeroSection({ children, extraCSS }) {
  return (
    <div
      className={`min-h-[calc(100vh-80px)] flex flex-col justify-center items-center relative ${extraCSS}`}
    >
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <ParticlesComponent className="w-full h-full" />
      </div>

      {children}
    </div>
  );
}

export default HeroSection;
