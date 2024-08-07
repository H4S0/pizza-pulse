"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UserTabs from "@/components/UserTabs";
import { useProfile } from "@/components/Useprofile";
import Right from "@/components/icons/Right";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
const page = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-7xl mx-auto p-4">
      <Navbar />
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Crete new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={""}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default page;
