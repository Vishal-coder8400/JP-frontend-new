import React, { useState } from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";

const Index = () => {
  const [formData, setFormData] = useState([]);
  const handleUpdateStatus = () => {};
  return (
    <main className="w-full h-full flex flex-col lg:flex-row">
      <Navbar />
      <div className="pt-[58px] lg:pt-[80px] w-full h-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Index;
