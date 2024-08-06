"use client";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import Left from "@/components/icons/Left";
import UserTabs from "@/components/UserTabs";
import Link from "next/link";
import MenuItemPriceProps from "@/components/MenuItemPriceProps";
import { useProfile } from "@/components/Useprofile";
import { redirect } from "next/dist/server/api-utils";
import React, { useState, useEffect } from "react";
import MenuItemForm from "@/components/MenuItemForm";

const page = () => {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

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
      <MenuItemForm />
    </section>
  );
};

export default page;
