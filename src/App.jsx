import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
