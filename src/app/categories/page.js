"use client";
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/Useprofile";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName };
    if (editedCategory) {
      data._id = editedCategory._id;
    }

    try {
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.error || "Unknown error");
      }

      // Clear input fields and fetch updated categories
      setCategoryName("");
      setEditedCategory(null);
      fetchCategories();

      // Show a success message
      await toast.promise(Promise.resolve(), {
        loading: editedCategory
          ? "Updating category..."
          : "Creating category...",
        success: editedCategory ? "Category updated" : "Category created",
        error: "Error, sorry...",
      });
    } catch (error) {
      // Show error message
      toast.error("Error updating/creating category");
      console.error("Request error:", error);
    }
  }

  async function handleDeleteClick(_id) {
    try {
      const response = await fetch(`/api/categories?_id=${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting category:", errorData);
        throw new Error(errorData.error || "Unknown error");
      }

      // Remove the deleted category from the state
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== _id)
      );

      // Show a success message
      await toast.promise(Promise.resolve(), {
        loading: "Deleting...",
        success: "Category deleted",
        error: "Error deleting category",
      });
    } catch (error) {
      // Show error message
      toast.error("Error deleting category");
      console.error("Request error:", error);
    }
  }

  if (profileLoading) {
    return <Loader />;
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-7xl mx-auto p-4">
      <Navbar />
      <UserTabs isAdmin={true} />
      <form
        className="mt-8 bg-white p-6 shadow-md rounded-lg"
        onSubmit={handleCategorySubmit}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-grow">
            <label className="block text-gray-700 font-semibold mb-2">
              {editedCategory ? "Update category" : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.category}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="bg-[#973131] text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50"
              type="submit"
            >
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
