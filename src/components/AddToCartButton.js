"use client";
import React, { useContext } from "react";
import { CartContext } from "./AppContext";

const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <button
      className="bg-[#973131] text-white rounded-full py-2 px-3 mt-4"
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
