import React from "react";
import { Table } from "../components/table/table"; // Import the "Table" component

// Define a functional component named "ResultPage"
const ResultPage = () => {
  return (
    <div className="container">
      {/* Create a container div */}
      <div className="w-full mt-[120px]">
        {/* Create a full-width div with margin-top */}
        <Table /> {/* Render the "Table" component */}
      </div>
    </div>
  );
};

export default ResultPage; // Export the "ResultPage" component as the default export
