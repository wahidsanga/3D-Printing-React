import React from "react";
import { Toaster } from "react-hot-toast";  // Import the "Toaster" component from "react-hot-toast."

// Define a ToastProvider component that renders the "Toaster" component.
export const ToastProvider = () => {
  return <Toaster />;  // Render the "Toaster" component to provide toast notifications.
};
