"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const page = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const res = await fetch("/api/menu-items");
      const data = await res.json();
      setMenuItems(data);
    }
    fetchMenuItems();
  }, []);

  const bestSeller = menuItems.slice(-3);

  return (
    <section id="menu">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#973131] mt-5">
        Our Menu
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {bestSeller.map((item) => (
          <div key={item._id} className="p-4 bg-white shadow-md rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold mt-4">{item.name}</h3>
            <p className="text-gray-700">{item.description}</p>
            <p className="text-gray-900 font-bold mt-2">${item.basePrice}</p>
            <div className="flex items-center justify-center">
              <AddToCartButton product={item} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[5%] text-center">
        <Link
          href="/all-menu-items"
          className="bg-[#973131] text-white py-2 px-6 rounded-lg"
        >
          View All Menu Items
        </Link>
      </div>
    </section>
  );
};

export default page;
