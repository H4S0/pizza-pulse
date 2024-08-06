import Plus from "./icons/Plus";
import Trash from "./icons/Trash";
import MenuItemPriceProps from "./MenuItemPriceProps";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (menuItem) {
      setImage(menuItem.image);
      setName(menuItem.name);
      setDescription(menuItem.description);
      setBasePrice(menuItem.basePrice);
      setSizes(menuItem.sizes);
      setCategory(menuItem.category);
      setExtraIngredientPrices(menuItem.extraIngredientPrices);
    }
  }, [menuItem]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setImage(upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = {
      image,
      name,
      description,
      basePrice,
      sizes,
      extraIngredientPrices,
      category,
    };
    console.log("Form Data: ", formData);

    const response = await fetch(
      menuItem ? `/api/menu-items/${menuItem._id}` : "/api/menu-items",
      {
        method: menuItem ? "PUT" : "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      console.log("Item created/updated successfully");
    } else {
      console.error("Error creating/updating item");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#973131]">
        {menuItem ? "Edit Menu Item" : "Add Menu Item"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="block text-gray-700 font-semibold mb-2">
            Item name
          </label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] mb-4"
          />

          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] mb-4"
          />

          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] mb-4"
          >
            <option value="">Select a category</option>
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.category}
                </option>
              ))}
          </select>

          <label className="block text-gray-700 font-semibold mb-2">
            Base price
          </label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] mb-4"
          />

          <label className="block text-gray-700 font-semibold mb-2">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] mb-4"
          />

          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Menu item"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-[#973131] text-white rounded-lg py-2 px-6 transition-all duration-300 ease-in-out hover:bg-[#7e2727]"
        >
          Save
        </button>
      </div>
    </form>
  );
}
