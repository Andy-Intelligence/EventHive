"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../layoutComponents/Button";

interface UserDetails {
  user: any;
}

const RegisterAsPersonalEventHost = ({ user }: UserDetails) => {
  const router = useRouter();

  const personalHostDefaultData = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    accountNumber: "",
    bankName: "",
    accountName: "",
    userId: user?._id,
  };

  const [formData, setFormData] = useState(personalHostDefaultData);

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
    try {
      const res = await fetch(
        "https://event-hive-liart.vercel.app/api/personal-host-event",
        {
          method: "POST",
          body: JSON.stringify({ formData }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to create Event");
      }

      router.refresh();
      router.push("/find-event");
    } catch (error) {
      console.error(error);
    }

    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center w-full p-10 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Register as Event Host
        </h1>

        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-600 font-semibold"
          >
            First Name
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            required
            value={formData.firstName}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-gray-600 font-semibold"
          >
            Last Name
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            required
            value={formData.lastName}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-600 font-semibold">
            Email
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
            value={formData.email}
          />
        </div>

        <div>
          <label
            htmlFor="mobileNumber"
            className="block text-gray-600 font-semibold"
          >
            Mobile Number
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            onChange={handleChange}
            required
            value={formData.mobileNumber}
          />
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-gray-600 font-semibold"
          >
            Date Of Birth
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            onChange={handleChange}
            value={formData.dateOfBirth}
          />
        </div>

        <div>
          <label
            htmlFor="accountNumber"
            className="block text-gray-600 font-semibold"
          >
            Account Number
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="accountNumber"
            name="accountNumber"
            onChange={handleChange}
            required
            value={formData.accountNumber}
          />
        </div>

        <div>
          <label
            htmlFor="bankName"
            className="block text-gray-600 font-semibold"
          >
            Bank Name
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            id="bankName"
            name="bankName"
            onChange={handleChange}
            required
            value={formData.bankName}
          >
            <option value="" disabled>
              Select Bank
            </option>
            <option value="bank1">Bank 1</option>
            <option value="bank2">Bank 2</option>
            <option value="bank3">Bank 3</option>
            <option value="bank4">Bank 4</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="accountName"
            className="block text-gray-600 font-semibold"
          >
            Account Name
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="accountName"
            name="accountName"
            onChange={handleChange}
            required
            value={formData.accountName}
          />
        </div>

        <div className="flex justify-center">
          <Button
            color="black"
            text="Continue"
            onSubmit={(e) => handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterAsPersonalEventHost;
