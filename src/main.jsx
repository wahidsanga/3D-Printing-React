import React from "react"; // Import React library
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./App.jsx"; // Import the main App component
import "./styles.css"; // Import styles for the application

// Create a root and render the application within it
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Use React.StrictMode for development mode enhancements */}
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);
