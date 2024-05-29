"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../layoutComponents/Button";

interface UserDetails {
  user: any;
}

const RegisterAsBrandEventHost = ({ user }: UserDetails) => {
  const router = useRouter();

  const brandHostDefaultData = {
    businessName: "",
    companyEmail: "",
    accountNumber: "",
    bankName: "",
    accountName: "",
    userId: user?._id,
  };

  const [formData, setFormData] = useState(brandHostDefaultData);

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
        "https://event-hive-liart.vercel.app/api/brand-host-event",
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
            htmlFor="businessName"
            className="block text-gray-600 font-semibold"
          >
            Business Name
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="businessName"
            name="businessName"
            onChange={handleChange}
            required
            value={formData.businessName}
          />
        </div>

        <div>
          <label
            htmlFor="companyEmail"
            className="block text-gray-600 font-semibold"
          >
            Company Email
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="email"
            id="companyEmail"
            name="companyEmail"
            onChange={handleChange}
            required
            value={formData.companyEmail}
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

export default RegisterAsBrandEventHost;
