"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "@/components/Useprofile";
import UserTabs from "@/components/UserTabs";
import { use } from "bcrypt/promises";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

const page = () => {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        // Ensure the response body is not empty
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  if (profileLoading) {
    return <Loader />;
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section className="max-w-7xl mx-auto p-4">
      <Navbar />
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
              <div className="text-gray-900">
                {!user.name ? "no name" : user.name}
              </div>
              <span className="text-gray-500">{user.email}</span>
            </div>
            <div>
              <Link className="button" href={"/users/" + user._id}>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
