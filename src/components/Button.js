import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-[#973131] text-white rounded-xl py-1 px-2">
      {children}
    </button>
  );
};

export default Button;
