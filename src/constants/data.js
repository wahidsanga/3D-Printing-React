// Definition of materials used for 3D printing
export const materials = [
  {
    id: 1,
    value: "1.015",
    name: "Plastic",
    formula: 24 / 300,
    printerUnitPrice: 20,
    materialUnitPrice: 0.1,
    printerName: "EOS Forniga 110", // Name of the 3D printer
  },
  {
    id: 2,
    value: "2.71",
    name: "Aluminium",
    formula: 1.2,
    printerUnitPrice: 30,
    materialUnitPrice: 0.2,
    printerName: "Metal Printer", // Name of the 3D printer
  },
  {
    id: 3,
    value: "7.86",
    name: "Steel",
    formula: 1.2,
    printerUnitPrice: 40,
    materialUnitPrice: 0.3,
    printerName: "Metal Printer", // Name of the 3D printer
  }
];

// Pricing and quantity information
export const pricesAndQuantity = {
  consumablesQuantity: 1,
  consumablesPrice: 1,
  labourQuantity: 1.5,
  labourPrice: 20,
  disclaimer1:
    "  NOTE: This is just an estimated cost, the actual cost might fluctuate", // Disclaimer 1
  disclaimer2:
    "** IMPORTANT: Based on your email address you might be eligible for an academic or student discount, please contact ADaPT’s technical staff members directly for additional information.**", // Disclaimer 2
};
