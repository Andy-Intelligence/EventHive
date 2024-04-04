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
      console.log(session.status);
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
      console.log(email, password);

      if (!isValidEmail(email)) {
        setError("Email is invalid");
        return;
      }
      //   || isStrongPassword(password)
      if (!password || password.length < 0) {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-extrabold mb-6">Login</h1>
      <Button
        color="bg-white text-black"
        text="Sign In with Google"
        onClick={() => handleGoogleSignIn()}
      />
      {/* <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit} className="flex flex-col w-full mt-6">
        <label className="text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <label className="text-gray-600 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <Button
          type="submit"
          color="bg-black text-white"
          text="Login"
          className="w-full"
        />
      </form>
      <p className="text-gray-600 mt-4">
        Not registered yet?{" "}
        <Link href="/register">
          Sign up here
        </Link>
        .
      </p> */}
    </div>
  );
};

export default Login;
