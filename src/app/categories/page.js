"use client";
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/Useprofile";
import toast from "react-hot-toast";

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
    const creationPromise = new Promise(async (resolve, reject) => {
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
          console.error("Error response:", errorData); // Debug log
          throw new Error(errorData.error || "Unknown error");
        }
        setCategoryName("");
        fetchCategories();
        setEditedCategory(null);
        resolve();
      } catch (error) {
        console.error("Request error:", error); // Debug log
        reject(error);
      }
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
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
              <div className="grow">{c.category}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.category);
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
