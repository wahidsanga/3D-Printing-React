import * as React from "react";   // Import React library.

import { cn } from "../../lib/utils";   // Import the "cn" utility function for handling CSS classes.

// Define a Table component using React.forwardRef.
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";  // Set the component's display name.

// Define a TableHeader component using React.forwardRef.
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";  // Set the component's display name.

// Define a TableBody component using React.forwardRef.
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";  // Set the component's display name.

// Define a TableFooter component using React.forwardRef.
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-white font-medium text-black border-t", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";  // Set the component's display name.

// Define a TableRow component using React.forwardRef.
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";  // Set the component's display name.

// Define a TableHead component using React.forwardRef.
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 bg-secondary first:rounded-tl-sm last:rounded-tr-sm px-4 text-left align-middle font-medium  [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";  // Set the component's display name.

// Define a TableCell component using React.forwardRef.
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-center [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";  // Set the component's display name.

// Define a TableCaption component using React.forwardRef.
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";  // Set the component's display name.

// Export the defined components.
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
