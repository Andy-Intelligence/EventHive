import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <span className="text-yellow-400">Event</span>App
        </div>
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
            className="text-white font-bold hover:text-yellow-400"
          >
            {isOpen ? "Close" : "Menu"}
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
