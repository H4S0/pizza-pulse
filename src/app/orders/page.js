"use client";

import { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";
const CartPage = () => {
  const { cartProducts, removeCartProduct, clearCart, cartProductPrice } =
    useContext(CartContext);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-6 text-center text-[#973131] mt-[5%]">
        Your Cart
      </h2>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartProducts.map((product, index) => (
              <li key={index} className="flex justify-between mb-4">
                <div>
                  <p>{product.name}</p>
                  <p>${cartProductPrice(product)}</p>
                </div>
                <button
                  className="bg-red-600 text-white py-1 px-3 rounded"
                  onClick={() => removeCartProduct(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <Link
              href="/checkout"
              className="bg-[#973131] text-white py-2 px-4 rounded ml-4"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
