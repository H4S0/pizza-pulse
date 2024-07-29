"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
    {isAdmin && (
        <p className="bg-[#973131] text-white font-semibold rounded-full px-2">
          Hello admin
        </p>
      )}
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/categories"}
            className={path === "/categories" ? "active" : ""}
          >
            Categories
          </Link>
          <Link
            href={"/menu-items"}
            className={path.includes("menu-items") ? "active" : ""}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes("/users") ? "active" : ""}
            href={"/users"}
          >
            Users
          </Link>
        </>
      )}
      <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
        Orders
      </Link>
    </div>
  );
}
