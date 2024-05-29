"use client"
import React, { useEffect, useState } from "react";
import Hero from "./homeSectionComponents/Hero";
import heroPhrases from "@/utils/heroUtils/heroPhrases";
const LoadingComponent = () => {

   const [phrase, setPhrase] = useState<string>("");
     useEffect(() => {
       const noOfPhraseElements = heroPhrases.length;
       const randomNo = Math.floor(Math.random() * noOfPhraseElements);
       setPhrase(heroPhrases[randomNo]);
     }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
      <p className="text-animation mt-4 text-gray-700 font-bold text4xl">
        {phrase}
      </p>
      {/* <div className="w-[90%] max-w-3xl mx-auto">
        <h1 className="text-black text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight animate-fadeIn">
          {phrase}
        </h1>
      </div> */}
      {/* <Hero /> */}
    </div>
  );
};

export default LoadingComponent;
