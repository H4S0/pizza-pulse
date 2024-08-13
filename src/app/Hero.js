import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex flex-col items-center mt-[10%] text-center">
      <div className="mb-5">
        <h2 className="text-4xl font-semibold">
          Slice into happiness, one{" "}
          <span className="text-[#973131] font-bold">pizza</span> at a time.
        </h2>
        <p className="mt-5 text-2xl">
          At <span className="font-bold text-[#973131]">Pizza Pulse</span>, we
          believe that pizza is a masterpiece, crafted <br /> with love and
          attention to detail, using only the freshest ingredients.
        </p>
      </div>
      <div className="flex relative items-center justify-center">
        <Image
          src="/—Pngtree—pizza slice_15340723.png"
          alt="alt"
          width={400}
          height={450}
          className="mx-auto"
        />
        <Image
          src="/cheese.png"
          width={100}
          height={150}
          className="absolute -left-10 md:-left-20 transform -rotate-12"
        />
        <Image
          src="/cheese.png"
          width={100}
          height={150}
          className="absolute -right-10 md:-right-20 top-0"
        />
      </div>
    </section>
  );
};

export default Hero;
