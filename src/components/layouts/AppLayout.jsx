import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../globals/Navbar";
import Sidebar from "../globals/Sidebar";
import Footer from "../globals/Footer";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
