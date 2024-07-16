import React from "react";

const PizzaCard = ({ pizza }) => {
  return (
    <div className="text-black">
      <img src={pizza.image} alt={pizza.name} className="" />
      <h2 className="">{pizza.name}</h2>
      <p className="">{pizza.ingredients.join(", ")}</p>
      <p className="">${pizza.price.toFixed(2)}</p>
    </div>
  );
};

export default PizzaCard;
