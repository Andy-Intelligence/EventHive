// "use client"
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Navbar from "@/components/layoutComponents/Navbar";
// import { useRouter } from "next/navigation";
// import Button from "../layoutComponents/Button";
// import heroPhrases from "@/utils/heroUtils/heroPhrases";


// const Hero = () => {
//   const router = useRouter();
//   const [phraseArray, setPhraseArray] = useState<Array<string>>(heroPhrases)
//   const [phrase, setPhrase] = useState<string>('')
//   // console.log(heroPhrases)
//   useEffect(()=>{
//     const noOfPhraseElements = heroPhrases.length
//     const randomNo = Math.ceil(Math.random() * noOfPhraseElements)
//     console.log(randomNo)
//     setPhrase(heroPhrases[randomNo])
//   },[])
 
  
//   return (
//     <section className="h-screen w-screen  flex flex-col items-center justify-between font-poppins pt-0 p-24">
//       <div className="h-screen w-screen flex flex-col items-center justify-between text-center">
//         <div className="w-full">
//           <Navbar />
//         </div>
//         <div className="w-[90%]">
//           <h1 className="font-poppins text-4xl font-extrabold text-black">
//             {phrase}
//           </h1>
//         </div>
//         <div>
//           <Button
//             text={"Let's dive in"}
//             color={"black text-white"}
            
//             onClick={() => {
//               router.push("/personal-interest");
//             }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Navbar from "@/components/layoutComponents/Navbar";
// import { useRouter } from "next/navigation";
// import Button from "../layoutComponents/Button";
// import heroPhrases from "@/utils/heroUtils/heroPhrases";

// const Hero = () => {
//   const router = useRouter();
//   const [phraseArray, setPhraseArray] = useState<Array<string>>(heroPhrases);
//   const [phrase, setPhrase] = useState<string>("");

//   useEffect(() => {
//     const noOfPhraseElements = heroPhrases.length;
//     const randomNo = Math.floor(Math.random() * noOfPhraseElements);
//     setPhrase(heroPhrases[randomNo]);
//   }, []);

//   return (
//     <section className="h-screen w-screen flex flex-col items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white font-poppins p-6 relative overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-30"
//         style={{ backgroundImage: 'url("/path-to-your-background-image.jpg")' }}
//       ></div>
//       <div className="relative z-10 w-full">
//         <Navbar />
//       </div>
//       <div className="relative z-10 flex flex-col items-center justify-center text-center flex-grow">
//         <div className="w-[90%] max-w-3xl mx-auto">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight animate-fadeIn">
//             {phrase}
//           </h1>
//         </div>
//         <div className="mt-8">
//           <Button
//             text={"Let's dive in"}
//             color={"bg-black text-white"}
//             onClick={() => {
//               router.push("/personal-interest");
//             }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layoutComponents/Navbar";
import Button from "../layoutComponents/Button";
import heroPhrases from "@/utils/heroUtils/heroPhrases";

const Hero = () => {
  const router = useRouter();
  const [phrase, setPhrase] = useState<string>("");

  useEffect(() => {
    const noOfPhraseElements = heroPhrases.length;
    const randomNo = Math.floor(Math.random() * noOfPhraseElements);
    setPhrase(heroPhrases[randomNo]);
  }, []);

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-300 to-gray-200 text-white font-poppins p-6">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        <div className="w-[90%] max-w-3xl mx-auto">
          <h1 className="text-black text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight animate-fadeIn">
            {phrase}
          </h1>
        </div>
        <div className="mt-8">
          <Button
            text={"Let's dive in"}
            color={"black hover:bg-gray-200"}
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
