// src/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

const Layout = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;