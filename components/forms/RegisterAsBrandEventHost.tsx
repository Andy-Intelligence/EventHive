"use client"
import React, { useState } from "react";
import Button from "../layoutComponents/Button";
import { useRouter } from "next/navigation";

const RegisterAsBrandEventHost = () => {
  const router = useRouter();

  const brandHostDefaultData = {
    businessName: "",
    companyEmail: "",
    accountNumber: 0,
    bankName: "",
    accountName: "",
    password: "",
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
    // Handle form submission logic here
    try {
      const res = await fetch(
        "https://event-hive-liart.vercel.app/host-event",
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
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="createForm font-sans flex items-center justify-center w-full p-5 ">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center">
          <h1 className="font-extrabold font-sans text-3xl mb-4">
            Create Your Event
          </h1>
        </div>

        <label className="createEventLabel">Business Name</label>
        <input
          className="createEventInput"
          type="text"
          placeholder=""
          id="businessName"
          name="businessName"
          onChange={handleChange}
          required={true}
          value={formData.businessName}
        />

        <label className="createEventLabel">Company Email</label>
        <input
          className="createEventInput"
          type="email"
          id="companyEmail"
          name="companyEmail"
          onChange={handleChange}
          required={true}
          value={formData.companyEmail}
        />
        <label className="createEventLabel">Account Number</label>
        <input
          className="createEventInput"
          type="number"
          id="accountNumber"
          name="accountNumber"
          onChange={handleChange}
          required={true}
          value={formData.accountNumber}
        />
        <label className="createEventLabel">Bank Name</label>
        <select
          className="createEventInput"
          id="bankName"
          name="bankName"
          onChange={handleChange}
          required={true}
          value={formData.bankName}
        >
          <option value={"parties"}>parties</option>
          <option value={"recreational"}>recreational</option>
          <option value={"artAndCulture"}>Arts and Culture</option>
          <option value={"restaurantAndLounges"}>recreational</option>
          <option value={"concerts"}>Concerts</option>
          <option value={"matchMaking"}>MatchMaking</option>
        </select>
        <label className="createEventLabel">Account Name</label>
        <input
          className="createEventInput"
          type="text"
          id="accountName"
          name="accountName"
          onChange={handleChange}
          required={true}
          value={formData.accountName}
        />
        <label className="createEventLabel">Password</label>
        <input
          className="createEventInput"
          type="text"
          id="password"
          name="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
        />

        <div className="w-full flex items-center justify-center">
          <Button
            color="black my-5"
            text="Continue"
            onSubmit={(e) => handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterAsBrandEventHost;
