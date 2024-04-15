"use client"
import React from "react";
import Link from "next/link";
import Navbar from "@/components/layoutComponents/Navbar";
import { useRouter } from "next/navigation";
import Button from "../layoutComponents/Button";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="h-screen w-screen bg-gradient-to-b from-purple-600 to-pink-500 flex flex-col items-center justify-between font-poppins pt-0 p-24">
      <div className="h-screen w-screen flex flex-col items-center justify-between text-center">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-[90%]">
          <h1 className="font-poppins text-4xl font-extrabold text-white">
            Your Pass to a World of Experiences!
          </h1>
        </div>
        <div>
          <Button
            text={"Let's Dive In"}
            color={"pink text-white"}
            
            onClick={() => {
              router.push("/personal-interest");
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
