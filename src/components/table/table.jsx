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
    const final = `${ltotal.toFixed(0)} ~ ${htotal.toFixed(0)}`;
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
      <DataTable columns={columns} data={data} />
      <p className="text-md text-muted-foreground my-2 text-end mr-4">
        Total: ${findTotalAmount()}
      </p>
      <div className="text-center text-xs text-muted-foreground">
        <p className="inline text-destructive">{pricesAndQuantity.disclaimer1}</p>
      </div>
      {email.includes("@griffith") && (
      <div className="text-center text-xs text-muted-foreground">
        <p className="inline text-destructive">{pricesAndQuantity.disclaimer2}</p>
      </div>
      )}
      <div className="place-self-end border p-2 rounded-sm bg-secondary my-2 grid gap-1">
        <span className="text-sm font-bold block">
          Customer Name: <span className="font-medium">{name}</span>
        </span>
        <span className="text-sm font-bold block">
          Email: <span className="font-medium">{email}</span>
        </span>
        <span className="text-sm font-bold block">
          Printer Name: <span className="font-medium">{info?.printerName}</span>
        </span>
        <span className="text-sm font-bold block">
          Mass:
          <span className="font-medium">{parseFloat(mass).toFixed(2)}</span>
        </span>
        <span className="text-sm font-bold block">
          Volume: <span className="font-medium">{parseFloat(volume).toFixed(2)}</span>
        </span>
        <span className="text-sm">
          <p className="font-bold">Bounding Box:</p>
          <p>Length: {parseFloat(splittedBoundingBox[0]).toFixed(2)}</p>
          <p>Width: {parseFloat(splittedBoundingBox[1]).toFixed(2)}</p>
          <p>Height: {parseFloat(splittedBoundingBox[2]).toFixed(2)}</p>
        </span>
      </div>
      
    </>
  );
}