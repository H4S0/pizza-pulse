"use client";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import Left from "@/components/icons/Left";
import UserTabs from "@/components/UserTabs";
import Link from "next/link";
import MenuItemPriceProps from "@/components/MenuItemPriceProps";
import { useProfile } from "@/components/Useprofile";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";
import MenuItemForm from "@/components/MenuItemForm";

const page = () => {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handleSubmitForm(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
        setRedirectToItems(true);
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return <Loader />;
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
      <MenuItemForm onSubmit={handleSubmitForm} />
    </section>
  );
};

export default page;
