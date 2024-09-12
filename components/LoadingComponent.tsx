"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroPhrases from "@/utils/heroUtils/heroPhrases";

const LoadingComponent = () => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const noOfPhraseElements = heroPhrases.length;
    const randomNo = Math.floor(Math.random() * noOfPhraseElements);
    setPhrase(heroPhrases[randomNo]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-100 to-yellow-300">
      <motion.div
        className="relative w-32 h-32"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full border-8 border-yellow-400 rounded-full opacity-25"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-yellow-600 rounded-full border-t-transparent animate-spin"></div>
      </motion.div>
      <motion.p
        className="mt-8 text-2xl font-bold text-yellow-800 text-center max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {phrase}
      </motion.p>
    </div>
  );
};

export default LoadingComponent;
