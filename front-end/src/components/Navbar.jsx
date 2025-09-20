import React, { useState } from "react";
import { FaBars, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // use next/link if using Next.js

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pages to navigate
  const pages = [
    {name: "Home", path: "/" },
    { name: "Community", path: "/community" },
  
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    
  ];

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      {/* Left: Logo + Hamburger */}
      <div className="flex items-center gap-4">
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
        <Link to='/'><img src="./public/images.jpg" alt="Logo" className="w-12 h-12" /></Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4">
        {pages.map((page) => (
          <Link
            key={page.name}
            to={page.path}
            className="hover:text-blue-500 transition"
          >
            {page.name}
          </Link>
        ))}
      </div>

      {/* Right: Cart + User */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaShoppingCart className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
            1
          </span>
        </div>
        <Link to='/user-dashboard'>
          <FaUserCircle className="text-2xl" />
        </Link>
      </div>

      {/* Mobile collapsible menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col gap-2 p-4">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              className="hover:text-blue-500 transition"
              onClick={() => setIsMenuOpen(false)} // close menu after click
            >
              {page.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
