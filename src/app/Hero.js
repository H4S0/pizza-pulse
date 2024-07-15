import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex items-center justify-between mt-6">
      <div>
        <h2 className="text-4xl">
          Slice into happiness,
          <br /> one <span className="text-[#973131] font-bold">pizza</span> at
          a time.
        </h2>
        <p className="w-[65vh] mt-5 text-2xl">
          At ST's PIZZA, we believe that pizza is more than just a meal – it's
          an experience. Each pizza is a masterpiece, crafted with love and
          attention to detail, using only the freshest ingredients.
        </p>
      </div>
      <div>
        <Image src="/pizza.png" alt="alt" width={400} height={450} />
      </div>
    </section>
  );
};

export default Hero;
