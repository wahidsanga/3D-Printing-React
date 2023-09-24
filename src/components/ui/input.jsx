import * as React from "react";  // Import React.
import { cn } from "../../lib/utils";  // Import the "cn" utility function.

// Define a functional component named "Input" using React.forwardRef.
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}  // Set the input type based on the provided "type" prop.
      className={cn(
        // Combine and apply CSS classes to style the input element.
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm",
        className
      )}
      ref={ref}  // Assign the provided ref to the input element.
      {...props}  // Spread any additional props onto the input element.
    />
  );
});

Input.displayName = "Input";  // Set the display name for the Input component.

export { Input };  // Export the Input component for use in other parts of the application.
