"use client";
import React, { useState } from "react";
import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleGoogleSignIn } from "@/utils/helpingFunctions/functions";


const Register = () => {
  const router = useRouter();

  const registerDefaultData = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [formData, setFormData] = useState(registerDefaultData);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await fetch("http://localhost:3000/api/register-user", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to create User");
      }

      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="createForm font-sans flex flex-col items-center justify-center w-full p-5 ">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center">
          <h1 className="font-extrabold font-sans text-3xl mb-4">Register</h1>
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-4">
          <p>Create an account to get tickets to events now</p>

          <div
            className="bg-white rounded-md p-2 font-bold"
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </div>
        </div>

        <label className="createEventLabel">Username</label>
        <input
          className="createEventInput"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          required={true}
          value={formData.username}
        />
        <label className="createEventLabel">Email</label>
        <input
          className="createEventInput"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required={true}
          value={formData.email}
        />

        <label className="createEventLabel">Password</label>
        <input
          className="createEventInput"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
        />
        <label className="createEventLabel">Repeat Password</label>
        <input
          className="createEventInput"
          type="password"
          id="repeatpassword"
          name="repeatpassword"
          onChange={handleChange}
          required={true}
          value={formData.repeatPassword}
        />

        <div className="w-full flex items-center justify-center">
          <Button
            color="black my-5"
            text="Register"
            onSubmit={(e) => handleSubmit}
          />
        </div>
      </form>
      <div>
        Already have an account?{" "}
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
