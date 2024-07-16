import React from "react";
import pizzaData from "../data/data";
import PizzaCard from "@/components/PizzaCard";
const Menu = () => {
  return (
    <section id="menu" className="mt-[20%]">
      <h2>Menu</h2>
      <div className="flex mt-[5%]">
        {pizzaData.map((pizza) => (
          <PizzaCard pizza={pizza} key={pizza.id} />
        ))}
      </div>
    </section>
  );
};

export default Menu;
