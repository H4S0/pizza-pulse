"use client";
import Navbar from "@/components/Navbar";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section>
      <Navbar />
      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br />
          Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form
        className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-[10%]"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#973131]">
          Register
        </h2>
        <div className="mb-4">
          <input
            type="username"
            placeholder="Username"
            value={username}
            disabled={creatingUser}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
        <div className="mb-9">
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
        <button
          type="submit"
          disabled={creatingUser}
          className="w-full bg-[#973131] text-white rounded-lg py-2 px-4 transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50"
        >
          Register
        </button>
        <div className="text-center mt-6 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link
            className="underline text-[#973131] hover:text-[#761d1d]"
            href="/login"
          >
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
