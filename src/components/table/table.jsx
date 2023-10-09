import React, { useEffect, useState } from "react";  // Import React and required hooks.
import { useSearchParams } from "react-router-dom";  // Import useSearchParams from react-router-dom for accessing URL parameters.

import { DataTable } from "../data-tables";  // Import DataTable component.
import { DashboardHeader } from "../header";  // Import DashboardHeader component.
import { columns } from "./columns";  // Import columns configuration.
import { materials, pricesAndQuantity } from "../../constants/data";  // Import data constants.
import { Input } from "../ui/input";  // Import Input component.

export function Table({}) {
  const [searchParams] = useSearchParams();  // Get URL search parameters.
  const [info, setInfo] = useState({});  // Initialize state for material info.
  const [formula, setFormula] = useState(0);  // Initialize state for formula.

  // Extract values from URL search parameters.
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const mass = searchParams.get("mass");
  const height = searchParams.get("height");
  const density = searchParams.get("density");
  const boundingBox = searchParams.get("boundingBox");
  const splittedBoundingBox = boundingBox.split(",");
  const volume = searchParams.get("volume");

  console.log(volume);

  // Calculate total price of 3D printing and display its as a +-10% range in string format
  const findTotalAmount = () => {
    const consumables =
      pricesAndQuantity.consumablesQuantity *
      pricesAndQuantity.consumablesPrice;
    const equipment = info?.formula * height * info?.printerUnitPrice;
    const rawMaterials = mass * info?.materialUnitPrice;
    const labor =
      pricesAndQuantity.labourQuantity * pricesAndQuantity.labourPrice;

    const total = consumables + equipment + rawMaterials + labor;

    const ltotal = total - (total * 0.1);
    const htotal = total + (total * 0.1);
    const final = `$${ltotal.toFixed(0)} ~ $${htotal.toFixed(0)}`;
    return final;
  };

  useEffect(() => {
    // Find the correct data from materials array based on density.
    const data = materials.find((data) => data.value.toString() === density);

    setInfo(data);
    setFormula(data?.formula);
  }, [density]);

  useEffect(() => {
    if (!formula) {
      setFormula(info?.formula);
    }
  }, [formula]);

  // Define data for the DataTable component.
  const data = [
    {
      name: "General Consumables",
      subtext: "Consumables",
      quantity: pricesAndQuantity.consumablesQuantity,
      unitPrice: pricesAndQuantity.consumablesPrice,
    },
    {
      name: `3D Printer - ${info?.printerName} (hrs)`,
      subtext: "Equipment",
      quantity: formula * height,
<<<<<<< HEAD
      unitPrice: info?.printerUnitPrice,

    },
    {
      name: `${info?.name} (g)`,
      subtext: "Raw Materials",
      quantity: mass,
      unitPrice: info?.materialUnitPrice,
    },
    {
      name: "Labour duration (hrs)",
      subtext: "Labour",
      quantity: pricesAndQuantity.labourQuantity,
      unitPrice: pricesAndQuantity.labourPrice,
    },
  ];

  return (
    <>
      {/* Render a header with a back button */}
      <DashboardHeader className="mb-2" heading={"Results"} back />

      {/* Table Heading */}
      <div className="text-center border p-2 rounded-sm bg-secondary my-2 grid gap-1">
        <span className="text-md font-bold block">Estimated cost break-down</span>
      </div>

      {/* Render DataTable component */}
      <DataTable columns={columns} data={data} customFooterRow={findTotalAmount()} />
      <br />

      {/* Render customer information */}
      <div className="flex justify-center">
        <table className="border border-black w-full">
          <tbody>
            <tr>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                Customer Name
              </td>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                <span className="font-medium">{name}</span>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                Email Address
              </td>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                <span className="font-medium">{email}</span> <br />
                {email.includes("@griffith") && (
                  <div className="text-center text-xs text-muted-foreground inline ml-2">
                    <p className="inline text-destructive">{pricesAndQuantity.disclaimer2}</p>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                Mass of product
              </td>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                <span className="font-medium">{parseFloat(mass).toFixed(2)} grams</span>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                Volume 
              </td>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                <span className="font-medium">{parseFloat(volume).toFixed(2)} cubic centimeter</span>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                Bounding Box Dimensions
              </td>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                <span className="font-bold">Length:</span>{" "}
                <span className="font-medium">
                  {parseFloat(splittedBoundingBox[0]).toFixed(2)} mm
                </span>
                <br />
                <span className="font-bold">Width:</span>{" "}
                <span className="font-medium">
                  {parseFloat(splittedBoundingBox[1]).toFixed(2)} mm
                </span>
                <br />
                <span className="font-bold">Height:</span>{" "}
                <span className="font-medium">
                  {parseFloat(splittedBoundingBox[2]).toFixed(2)} mm
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                Estimated cost range for 3D printing
              </td>
              <td className="border border-black p-2 rounded-sm bg-secondary">
                <span className="font-medium">{findTotalAmount()}</span>
                <div className="text-center text-xs text-muted-foreground inline ml-2">
                  <p className="inline text-destructive">{pricesAndQuantity.disclaimer1}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
