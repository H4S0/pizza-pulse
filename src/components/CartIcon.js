"use client";
import React from "react";
import { useContext } from "react";
import { CartContext } from "./AppContext";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  const { cartProducts } = useContext(CartContext);

  const totalItems = cartProducts.length;
  console.log(totalItems);
  return (
    <div className="relative">
      <FaShoppingCart size={24} className="text-[#973131]" />
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems}
      </span>
    </div>
  );
};

export default CartIcon;
