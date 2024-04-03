"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import isValidEmail, {
  handleGoogleSignIn,
  isStrongPassword,
} from "@/utils/helpingFunctions/functions";

const Login = () => {
  const [error, setError] = useState("");
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      // router.replace("/find-event");
      console.log(session.status)
    }
  }, []);
  const router = useRouter();

  const registerDefaultData = {
    email: "",
    password: "",
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
      //   const res = await fetch("http://localhost:3000/api/login-user", {
      //     method: "POST",
      //     body: JSON.stringify({ formData }),
      //     headers: { "Content-Type": "application/json" },
      //   });
      const email = formData?.email;
      const password = formData?.password;
      console.log(email,password)

      if (!isValidEmail(email)) {
        setError("Email is invalid");
        return;
      }
    //   || isStrongPassword(password)
      if (!password || password.length < 0 ) {
        setError("Password is invalid");
        const display = () => {
          return (
            <div>
              <p>
                // Check if the password meets the following criteria: // - At
                least 8 characters long // - Contains at least one uppercase
                letter // - Contains at least one lowercase letter // - Contains
                at least one digit
              </p>
            </div>
          );
        };
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res?.ok) {
        console.log(res);
        throw new Error("Failed to login User");
      }

      router.refresh();
      router.push("/find-event");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="createForm font-sans flex flex-col items-center justify-center w-full p-5 ">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center">
          <h1 className="font-extrabold font-sans text-3xl mb-4">Login</h1>
        </div>
        <div
          className="bg-white rounded-md p-2 font-bold"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </div>
        <p>{error && error}</p>

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

        <div className="w-full flex items-center justify-center">
          <Button
            color="black my-5"
            text="Login"
            onSubmit={(e) => handleSubmit}
          />
        </div>
      </form>
      <div className="block text-center text-blue-500 hover:underline mt-2">
        Make sure to be part of an event today!
      </div>
    </div>
  );
};

export default Login;
