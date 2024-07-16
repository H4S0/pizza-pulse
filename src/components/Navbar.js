"use client";

import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import { GiFullPizza } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-5 bg-white relative">
      <div className="flex flex-row items-center gap-5">
        <h2 className="text-3xl text-[#973131] font-bold">ST PIZZA's</h2>
        <GiFullPizza className="w-[35px] h-[35px] text-[#973131]" />
      </div>
      <div>
        <TiThMenu
          className={`w-[35px] h-[35px] text-[#973131] cursor-pointer block lg:hidden ${
            isOpen ? "hidden" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <ul className="hidden lg:flex gap-8 items-center">
        <Link href="/" className="text-lg lg:text-base">
          Home
        </Link>
        <Link href="/about" className="text-lg lg:text-base">
          About
        </Link>
        <Link href="#menu" className="text-lg lg:text-base">
          Menu
        </Link>
        <Link href="/locations" className="text-lg lg:text-base">
          Locations
        </Link>
        <Button>Sign Up</Button>
      </ul>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center z-10">
          <MdOutlineRestaurantMenu
            className="w-[35px] h-[35px] text-[#973131] cursor-pointer lg:hidden block absolute right-0 top-0"
            onClick={() => setIsOpen(!isOpen)}
          />
          <ul className="flex flex-col gap-8 items-center">
            <Link href="/" className="text-2xl">
              Home
            </Link>
            <Link href="/about" className="text-2xl">
              About
            </Link>
            <Link href="#menu" className="text-2xl">
              Menu
            </Link>
            <Link href="/locations" className="text-2xl">
              Locations
            </Link>
            <Button>Sign Up</Button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
