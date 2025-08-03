import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { categorizedMusicAPI, categorizedVideoArray } from "./data/songs"; // Import data

function App() {
  const [activeCategory, setActiveCategory] = useState("Hindi");

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-between text-white font-inter relative overflow-hidden">
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={Object.keys(categorizedMusicAPI)}
      />
      <Home
        activeCategory={activeCategory}
        categorizedMusicAPI={categorizedMusicAPI}
        categorizedVideoArray={categorizedVideoArray}
      />
      <Footer />
    </div>
  );
}

export default App;
