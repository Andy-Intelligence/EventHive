import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session }: any = useSession();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/find-event" className="text-white hover:text-yellow-400">
          <div className="text-white text-3xl font-bold">
            <span className="text-yellow-400">Event</span>Hive
          </div>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="#" className="text-white hover:text-yellow-400">
            Home
          </Link>
          <Link href="#" className="text-white hover:text-yellow-400">
            Events
          </Link>
          <Link href="#" className="text-white hover:text-yellow-400">
            About
          </Link>
          <Link href="#" className="text-white hover:text-yellow-400">
            Contact
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white font-bold flex items-center justify-center hover:text-yellow-400 text-2xl"
          >
            {isOpen ? (
              "Close"
            ) : (
              <GiHamburgerMenu className="text-white" size={30} />
            )}
          </button>
        </div>
        <div className={isOpen ? "md:hidden" : "hidden"}>
          <div className="flex flex-col space-y-4 font-bold">
            <Link href="#" className="text-white hover:text-yellow-400">
              Home
            </Link>
            <Link href="#" className="text-white hover:text-yellow-400">
              Events
            </Link>
            <Link href="#" className="text-white hover:text-yellow-400">
              About
            </Link>
            <Link href="#" className="text-white hover:text-yellow-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
