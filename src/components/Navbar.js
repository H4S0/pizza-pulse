"use client";

import Link from "next/link";
import { useState } from "react";
import { GiFullPizza } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";

function UserLogout({ status, username }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href="/profile">Hello, {username}</Link>
        <button
          onClick={() => signOut()}
          className="bg-[#973131] text-white rounded-xl py-2 px-3 transition-all duration-300 ease-in-out hover:scale-105"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link
          href="/login"
          className="text-[#973131] border-[2px] hover:scale-105 rounded-xl py-2 px-3 transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-[#973131] text-white rounded-xl py-2 px-3 transition-all duration-300 ease-in-out hover:scale-105"
        >
          Register
        </Link>
      </>
    );
  }
  return null;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const username = session?.user?.name;

  console.log(session); // Debugging line

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
          Profile
        </Link>
        <Link href="#menu" className="text-lg lg:text-base">
          Menu
        </Link>
        <Link href="/locations" className="text-lg lg:text-base">
          Locations
        </Link>
        <UserLogout status={status} username={username} />
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
            <div className="flex gap-3">
              <UserLogout status={status} username={username} />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
