import React from 'react'
import { IoSearch } from "react-icons/io5";
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';

function Navbar() {
  return (
    <>
      <nav className="text-center p-4 bg-yellow-600 text-white shadow-lg">
        <h1 className="text-2xl font-semibold">POKEMON</h1>
      </nav>
    </>
  )
}
export default Navbar;