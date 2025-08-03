import React from "react";
import { Instagram, Facebook, Linkedin, Github } from "lucide-react"; // Updated imports

function Footer() {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-white/10 backdrop-blur-2xl p-4 flex justify-center gap-8 md:gap-16 z-20 shadow-lg rounded-t-xl transition-all duration-300 ease-in-out">
      {/* Facebook Icon */}
      <a
        href="https://www.facebook.com/patel.neel.7777019" // You can replace with your actual Facebook URL
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-600 transition-all duration-300 transform hover:scale-150 hover:translate-y-[-8px] drop-shadow-lg"
      >
        <Facebook size={32} />
      </a>

      {/* Instagram Icon */}
      <a
        href="https://www.instagram.com/_neelpatell/?next=%2F" // Your provided Instagram URL
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-pink-500 transition-all duration-300 transform hover:scale-150 hover:-rotate-6 drop-shadow-lg"
      >
        <Instagram size={32} />
      </a>

      {/* LinkedIn Icon */}
      <a
        href="https://www.linkedin.com/in/patel-neel-38868730a/" // You can replace with your actual LinkedIn URL
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-500 transition-all duration-300 transform hover:scale-150 hover:translate-y-[-8px] drop-shadow-lg"
      >
        <Linkedin size={32} />
      </a>

      {/* GitHub Icon */}
      <a
        href="https://github.com/PatelNeelA" // You can replace with your actual GitHub URL
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-400 transition-all duration-300 transform hover:scale-150 hover:translate-y-[-8px] drop-shadow-lg"
      >
        <Github size={32} />
      </a>
    </footer>
  );
}

export default Footer;
