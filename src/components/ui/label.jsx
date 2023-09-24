import * as React from "react";  // Import React.
import * as LabelPrimitive from "@radix-ui/react-label";  // Import Radix UI Label components.
import { cn } from "../../lib/utils";  // Import the "cn" utility function.

// Define a functional component named "Label" that accepts various props.
const Label = ({ htmlFor, label, muted, className }) => (
  <LabelPrimitive.Root
    className={cn(
      // Combine and conditionally apply CSS classes based on props and states.
      "text-[14px] mb-1 font-medium text-primary",
      muted && "text-primary/60 text-[12px]",
      className
    )}
    htmlFor={htmlFor}  // Set the "for" attribute to associate the label with an input element.
  >
    {label}  {/* Render the label text. */}
  </LabelPrimitive.Root>
);

export { Label };  // Export the "Label" component for use in other parts of the application.
