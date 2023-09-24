// Import necessary functions and components from libraries and modules.
import {
  useReactTable,         // Import the 'useReactTable' hook from the '@tanstack/react-table' library.
  flexRender,             // Import the 'flexRender' function from the '@tanstack/react-table' library.
  getCoreRowModel,        // Import the 'getCoreRowModel' function from the '@tanstack/react-table' library.
} from "@tanstack/react-table";

import {
  Table,                 // Import the 'Table' component from the './ui/table' module.
  TableBody,             // Import the 'TableBody' component from the './ui/table' module.
  TableCell,             // Import the 'TableCell' component from the './ui/table' module.
  TableFooter,           // Import the 'TableFooter' component from the './ui/table' module.
  TableHead,             // Import the 'TableHead' component from the './ui/table' module.
  TableHeader,           // Import the 'TableHeader' component from the './ui/table' module.
  TableRow,              // Import the 'TableRow' component from the './ui/table' module.
} from "./ui/table";

// Define a functional component named "DataTable" that takes props as input.
export function DataTable({ columns, data, customFooterRow }) {
  // Initialize the React Table instance using the provided data and columns.
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // Get the core row model for the table.
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  });

  // Return the JSX for rendering the DataTable component.
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {/* Render the table headers */}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    style={{
                      width:
                        header.getSize() !== 0 ? header.getSize() : undefined,
                    }}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {/* Render the table body */}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width:
                        cell.column.getSize() !== 0
                          ? cell.column.getSize()
                          : undefined,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              {/* Render a message if there are no results */}
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          {/* Render the table footer */}
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}

          {/* Add a custom footer row for the "Total" */}
          <tr>
            <td colSpan={columns.length - 1} style={{ textAlign: 'right', fontWeight: 'bold', color: 'red'}}>
              Estimated Total: 
            </td>
            <td className="text-right">{customFooterRow}</td>
          </tr>
        </TableFooter>
      </Table>
    </div>
  );
}
