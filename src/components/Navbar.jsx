import React, { useState } from "react";
import { Menu, X, Music } from "lucide-react";

function Navbar({ activeCategory, setActiveCategory, categories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/10 backdrop-blur-2xl shadow-lg px-6 py-4 transition-all duration-300 ease-in-out z-50 animate-fadeIn">
      {/* Top Row: Logo + Toggle */}
      <div className="flex justify-between items-center">
        {/* Logo - Now clickable to set activeCategory to 'All' */}
        <div
          className="flex items-center gap-3 text-white font-bold text-2xl tracking-wide font-[Inter] cursor-pointer"
          onClick={() => setActiveCategory("All")} // Set active category to 'All' on logo click
        >
          <Music className="w-7 h-7 text-purple-600" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            MusicHub
          </span>
        </div>

        {/* Desktop Nav (Hidden on mobile + tablet) */}
        <div className="hidden lg:flex items-center gap-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ease-in-out ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg scale-105"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:shadow-md"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95`}
            >
              {category} Songs
            </button>
          ))}
        </div>

        {/* Mobile + Tablet Toggle Button */}
        <button
          className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-purple-400 p-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile + Tablet Nav Menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-3 mt-4 lg:hidden">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setIsMenuOpen(false);
              }}
              className={`w-full px-4 py-2 rounded-full text-base font-medium transition-all duration-300 ease-in-out ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md scale-[1.02]"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:shadow-sm"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95`}
            >
              {category} Songs
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
