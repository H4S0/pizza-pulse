"use client";
import Left from "@/components/icons/Left";
import UserTabs from "@/components/UserTabs";
import Link from "next/link";
import MenuItemForm from "@/components/MenuItemForm";
import { useProfile } from "@/components/Useprofile";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";

const page = () => {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(e) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Contect-Type": "application/json" },
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return res.redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default page;
