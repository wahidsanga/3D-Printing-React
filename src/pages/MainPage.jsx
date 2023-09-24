import React from "react";
import { PrintingForm } from "../components/printing-form"; // Import the "PrintingForm" component

// Define a functional component named "MainPage"
const MainPage = () => {
  return (
    <div className="container grid place-content-center min-h-screen">
      {/* Create a container div with grid layout and centered content */}
      <div className="border p-10 grid gap-4">
        {/* Create a border container with padding and grid layout */}
        <h1 className="font-bold text-2xl">3D Printer Order Form</h1>
        {/* Render a bold heading */}
        <PrintingForm /> {/* Render the "PrintingForm" component */}
      </div>
    </div>
  );
};

export default MainPage; // Export the "MainPage" component as the default export
