import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DataTable } from "../data-tables";
import { DashboardHeader } from "../header";
import { columns } from "./columns";
import { materials, pricesAndQuantity } from "../../constants/data";
import { Input } from "../ui/input";

export function Table({}) {
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState({});
  const [formula, setFormula] = useState(0);

  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const mass = searchParams.get("mass");
  const height = searchParams.get("height");
  const density = searchParams.get("density");
  const boundingBox = searchParams.get("boundingBox");
  const splittedBoundingBox = boundingBox.split(",");
  const volume = searchParams.get("volume");

  console.log(volume);
  // Calculate total price
  const findTotalAmount = () => {
    const consumables =
      pricesAndQuantity.consumablesQuantity +
      pricesAndQuantity.consumablesPrice;
    const equipment = info?.formula * height * height;
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
    // find the correct data from materials array
    const data = materials.find((data) => data.value.toString() === density);

    setInfo(data);
    setFormula(data?.formula);
  }, [density]);

  useEffect(() => {
    if (!formula) {
      setFormula(info?.formula);
    }
  }, [formula]);

  

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
      unitPrice: height,
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
      <DashboardHeader className="mb-2" heading={"Results"} back />

  

      {/* Table Heading */}
      <div className="text-center border p-2 rounded-sm bg-secondary my-2 grid gap-1">
        <span className="text-md font-bold block">Estimated cost break-down</span>
      </div>

      <DataTable columns={columns} data={data} customFooterRow={findTotalAmount()} />
      
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
          <span className="font-medium">{email}</span>
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
            {parseFloat(splittedBoundingBox[0]).toFixed(2)} cm
          </span>
          <br />
          <span className="font-bold">Width:</span>{" "}
          <span className="font-medium">
            {parseFloat(splittedBoundingBox[1]).toFixed(2)} cm
          </span>
          <br />
          <span className="font-bold">Height:</span>{" "}
          <span className="font-medium">
            {parseFloat(splittedBoundingBox[2]).toFixed(2)} cm
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