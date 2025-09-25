import React, { useState } from "react";
import { FaBars, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom"; // use next/link if using Next.js

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
    <nav className="flex items-center justify-between p-4 bg-white text-white shadow-md sticky top-0 z-50">
      {/* Left: Logo + Hamburger */}
      <div className="flex items-center gap-4">
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
        <Link to='/'><img src="./public/images.jpg" alt="Logo" className="w-12 h-12 rounded" /></Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-2">
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.path}
            className={({ isActive }) =>
              `px-3 py-1 rounded-lg transition ${isActive ? 'bg-white text-green-700 font-semibold' : 'text-green-400 hover:bg-white/10'}`
            }
          >
            {page.name}
          </NavLink>
        ))}
      </div>

      {/* Right: Cart + User */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaShoppingCart className="text-xl text-green-400" />
          <span className="absolute -top-2 -right-2 bg-white text-green-700 rounded-full px-2 text-xs">
            1
          </span>
        </div>
        <Link to='/user-dashboard'>
          <FaUserCircle className="text-4xl text-green-400" />
        </Link>
      </div>

      {/* Mobile collapsible menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col gap-2 p-4">
          {pages.map((page) => (
            <NavLink
              key={page.name}
              to={page.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-slate-800 hover:bg-slate-50'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {page.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
