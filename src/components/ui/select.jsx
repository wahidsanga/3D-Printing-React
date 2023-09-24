import * as SelectPrimitive from "@radix-ui/react-select";  // Import the Radix UI Select components.
import { cn } from "../../lib/utils";  // Import the "cn" utility function.
import { Icons } from "../icons";  // Import the "Icons" object.

// Define a functional component named "Select" that accepts various props.
const Select = ({ data, onValueChange, defaultValue, className, disabled }) => {
  return (
    <div className="relative">
      <SelectPrimitive.Root
        onValueChange={onValueChange}
        defaultValue={defaultValue}
      >
        <SelectPrimitive.Trigger
          asChild
          disabled={disabled}
          className={cn(
            // Combine and conditionally apply CSS classes based on props and states.
            "flex justify-between items-center h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-white file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70",
            className
          )}
          aria-label="Category"
        >
          <button>
            <SelectPrimitive.Value />  {/* Render the selected option value. */}
            <SelectPrimitive.Icon className="ml-2">
              <Icons.down className="h-4 w-4" />  {/* Render a down arrow icon. */}
            </SelectPrimitive.Icon>
          </button>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content className="z-50">
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-between text-gray-700">
            <Icons.up className="h-4 w-4" />  {/* Render an up arrow icon. */}
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport
            className="bottom-0 p-2 bg-white rounded-lg shadow-2xl"
            style={{ zIndex: "10000" }}
          >
            <SelectPrimitive.Group>
              {data?.map((item, i) => (
                // Map and render the list of options.
                <SelectPrimitive.Item
                  key={item.id}
                  value={item.value}
                  className={cn(
                    // Combine and conditionally apply CSS classes for each option.
                    "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100",
                    "focus:outline-none select-none"
                  )}
                >
                  <SelectPrimitive.ItemText>
                    {item.name}  {/* Render the option's text. */}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Icons.check className="h-4 w-4" />  {/* Render a checkmark icon for selected option. */}
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
            <Icons.down className="h-4 w-4" />  {/* Render a down arrow icon. */}
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    </div>
  );
};

export { Select };  // Export the "Select" component for use in other parts of the application.
