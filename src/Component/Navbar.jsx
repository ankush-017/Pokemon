import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-md">
      {/* Left section - Logo */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          Pokémon
        </Link>
      </div>

      {/* Center - Search */}
      <div className="w-full sm:w-1/2">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Right - Navigation Links */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
        <Link
          to="/favorites"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-2xl transition duration-200"
        >
          Favorites
        </Link>
        <Link
          to="/compare"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl transition duration-200"
        >
          Compare
        </Link>
        <Link
          to="/random"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl transition duration-200"
        >
          Random
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;