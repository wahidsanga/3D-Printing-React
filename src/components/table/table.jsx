import { useSearchParams } from "react-router-dom";
import { DataTable } from "../data-tables";
import { DashboardHeader } from "../header";
import { columns } from "./columns";
import React from "react";

export function Table({}) {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");
  const quantity = searchParams.get("quantity");
  const mass = searchParams.get("mass");

  const data = [
    {
      name: "General Consumables",
      //subtext: "Consumables",
      quantity,
      unitPrice: "1",
    },
    {
      name: "3D Printer - EOS Formiga 110 (hrs)",
      //subtext: "Equipment",
      quantity: "0.00",
      unitPrice: "20",
    },
    {
      name: "EOS - Nylon12 (g)",
      //subtext: "Raw Materials",
      quantity: mass,
      unitPrice: "0.1",
    },
    {
      name: "Labour duration (hrs)",
      //subtext: "Labour",
      quantity: "1.5",
      unitPrice: "20",
    },
  ];

  return (
    <>
      <DashboardHeader
        className="mb-2"
        heading={"Results"}
        text={`Customer: ${name}`}
        back
      />
      <DataTable columns={columns} data={data} />
    </>
  );
}
