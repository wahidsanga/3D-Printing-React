import { useNavigate } from "react-router-dom";  // Import the "useNavigate" hook from React Router DOM.
import { Icons } from "../components/icons";      // Import the "Icons" object from the icons module.
import { cn } from "../lib/utils";                // Import the "cn" function from the utilities module.
import { buttonVariants } from "../components/ui/button";  // Import the "buttonVariants" function from the UI button module.

// Define a functional component named "DashboardHeader" that takes props as input.
export function DashboardHeader({ heading, text, children, back, className }) {
  const history = useNavigate();  // Initialize the "history" variable using the "useNavigate" hook.

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between",
          back && "flex-col items-start",  // Conditionally apply additional styles if "back" prop is provided.
          className  // Apply the "className" prop to the component's classes.
        )}
      >
        {back ? (  // Conditionally render a back button if "back" prop is provided.
          <button
            onClick={() => history(-1)}  // Handle the click event to navigate back in history.
            className={cn(buttonVariants({ variant: "ghost" }), "px-1 h-8")}  // Apply styles to the button.
          >
            <Icons.left className="mr-2 h-4 w-4" /> Back  {/* Render a back arrow icon and "Back" text. */}
          </button>
        ) : null}
        <div className="flex flex-col gap-1  justify-center">
          <h1 className="font-heading tracking-tight font-bold text-3xl md:text-4xl">
            {heading}  {/* Render the heading text with specified styles. */}
          </h1>
          {text && <p className="text-md text-muted-foreground">{text}</p>}  {/* Render additional text if "text" prop is provided. */}
        </div>
        {children}  {/* Render any child components provided to the "DashboardHeader" component. */}
      </div>
    </>
  );
}
