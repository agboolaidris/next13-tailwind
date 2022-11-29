import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

interface SQTableProps {
  columns: ColumnDef<any>[];
  rows: any[];
}

function SQTable({ columns, rows }: SQTableProps) {
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="w-full border-collapse">
      <thead className="bg-slate-400">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-slate-200">
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-4">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="text-center">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                <div className="flex justify-center items-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
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
      </tfoot>
    </table>
  );
}

export default SQTable;
