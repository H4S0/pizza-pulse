"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

const page = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const res = await fetch("/api/menu-items");
      const data = await res.json();
      setMenu(data);
    }
    fetchMenuItems();
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-4">
      <Navbar />
      <div className="mt-[5%]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#973131] mt-5">
          Our Menu
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {menu.map((item) => (
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
      </div>
    </section>
  );
};

export default page;
