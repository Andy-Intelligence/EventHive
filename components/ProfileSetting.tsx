"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MUIButton from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/layoutComponents/Button";
import { signOut, signIn, useSession } from "next-auth/react";

export default function AccordionUsage({ userDetails }: any) {
  const { data: session } = useSession();

  const router = useRouter();

  const registerDefaultData = {
    username: userDetails?.username,
    email: userDetails?.email,
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-userDetails/${userDetails?._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ formData }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        const errorMessage = await res.json();
        console.error(errorMessage);
        throw new Error("Failed to update User");
      }
      router.refresh();
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Contact Information
          </AccordionSummary>
          <AccordionDetails className="flex flex-col">
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
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Password & Help
          </AccordionSummary>
          <AccordionDetails className="flex flex-col">
            <label className="createEventLabel">Password</label>
            <input
              className="createEventInput"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required={false}
              value={formData.password}
            />
          </AccordionDetails>
        </Accordion>

        <div className="w-full flex items-center justify-center">
          <Button
            color="black my-5"
            text="SAVE SETTINGS"
            onSubmit={(e) => handleSubmit}
          />
        </div>
        {/* <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion> */}
      </form>

      {session ? (
        <div
          className="block font-bold text-lg text-center text-red-500 hover:underline mt-2"
          onClick={() => signOut()}
        >
          Logout
        </div>
      ) : (
        <div
          className="block font-bold text-lg text-center text-white hover:underline mt-2"
          onClick={() => signIn()}
        >
          Login
        </div>
      )}
    </div>
  );
}
