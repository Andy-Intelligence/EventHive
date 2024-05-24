// import React, { useState } from "react";
// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// import { GiHamburgerMenu } from "react-icons/gi";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { data: session }: any = useSession();

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-black p-8">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link href="/find-event" className="text-white hover:text-yellow-400">
//           <div className="text-white text-3xl font-bold">
//             <span className="text-yellow-400">Event</span>Hive
//           </div>
//         </Link>
//         <div className="hidden md:flex space-x-4">
//           <Link href="#" className="text-white hover:text-yellow-400">
//             Home
//           </Link>
//           <Link href="#" className="text-white hover:text-yellow-400">
//             Events
//           </Link>
//           <Link href="#" className="text-white hover:text-yellow-400">
//             About
//           </Link>
//           <Link href="#" className="text-white hover:text-yellow-400">
//             Contact
//           </Link>
//         </div>
//         <div className="md:hidden">
//           <button
//             onClick={toggleNavbar}
//             className="text-white font-bold flex items-center justify-center hover:text-yellow-400 text-2xl"
//           >
//             {isOpen ? (
//               "Close"
//             ) : (
//               <GiHamburgerMenu className="text-white" size={30} />
//             )}
//           </button>
//         </div>
//         <div className={isOpen ? "md:hidden" : "hidden"}>
//           <div className="flex flex-col space-y-4 font-bold">
//             <Link href="#" className="text-white hover:text-yellow-400">
//               Home
//             </Link>
//             <Link href="#" className="text-white hover:text-yellow-400">
//               Events
//             </Link>
//             <Link href="#" className="text-white hover:text-yellow-400">
//               About
//             </Link>
//             <Link href="#" className="text-white hover:text-yellow-400">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



"use client"
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session }: any = useSession();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/find-event">
          <div className="text-white text-3xl font-bold">
            <span className="text-yellow-400">Event</span>Hive
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <div className="relative group">
            <Link
              href="/events"
              className="text-white hover:text-yellow-400 transition duration-300"
            >
              Events
            </Link>
            <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <Link
                href="/events/upcoming"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Upcoming Events
              </Link>
              <Link
                href="/events/past"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Past Events
              </Link>
              <Link
                href="/events/featured"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Featured Events
              </Link>
            </div>
          </div>
          <Link
            href="/about"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Contact
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white font-bold flex items-center justify-center hover:text-yellow-400 text-2xl"
          >
            {isOpen ? <FaTimes size={30} /> : <GiHamburgerMenu size={30} />}
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col space-y-4 mt-4 px-6 font-bold">
          <Link
            href="/"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <div className="group">
            <Link
              href="/events"
              className="text-white hover:text-yellow-400 transition duration-300"
            >
              Events
            </Link>
            <div className="ml-4 mt-2">
              <Link
                href="/events/upcoming"
                className="block text-white hover:text-yellow-400 transition duration-300"
              >
                Upcoming Events
              </Link>
              <Link
                href="/events/past"
                className="block text-white hover:text-yellow-400 transition duration-300"
              >
                Past Events
              </Link>
              <Link
                href="/events/featured"
                className="block text-white hover:text-yellow-400 transition duration-300"
              >
                Featured Events
              </Link>
            </div>
          </div>
          <Link
            href="/about"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-yellow-400 transition duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
