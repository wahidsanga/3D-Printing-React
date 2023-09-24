import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import necessary components from react-router-dom
import MainPage from "./pages/MainPage"; // Import the "MainPage" component
import ResultPage from "./pages/ResultPage"; // Import the "ResultPage" component
import { Toaster } from "react-hot-toast"; // Import the "Toaster" component for displaying toasts

// Define the main application component named "App"
const App = () => {
  return (
    <BrowserRouter>
      {/* Create a BrowserRouter to handle routing */}
      <Toaster /> {/* Render the "Toaster" component for displaying toasts */}
      <Routes>
        {/* Define routes for the application */}
        <Route path="/" element={<MainPage />} />
        {/* Route for the main page, rendering the "MainPage" component */}
        <Route path="result" element={<ResultPage />} />
        {/* Route for the result page, rendering the "ResultPage" component */}
      </Routes>
    </BrowserRouter>
  );
};

export default App; // Export the "App" component as the default export
