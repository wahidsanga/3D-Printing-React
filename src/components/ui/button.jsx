import * as React from "react";  // Import React.
import { cva } from "class-variance-authority";  // Import class-variance-authority (cva) for creating button variants.
import { cn } from "../../lib/utils";  // Import the "cn" utility function.

// Create button variants using class-variance-authority (cva).
const buttonVariants = cva(
  // Define the base class and common styles for button variants.
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    // Define variants and their corresponding styles.
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent:
          "bg-accent1 text-white uppercase hover:bg-black tracking-wider rounded-none",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",  // Set the default variant for buttons.
      size: "default",      // Set the default size for buttons.
    },
  }
);

// Define a functional component named "Button" using React.forwardRef.
const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";  // Set the display name for the Button component.

export { Button, buttonVariants };  // Export the Button component and buttonVariants for use in other parts of the application.
