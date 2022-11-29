import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  getFacetedRowModel,
  getPaginationRowModel,
  FilterFn,
} from "@tanstack/react-table";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";
import ReactPaginate from "react-paginate";
interface SQTableProps {
  columns: ColumnDef<any>[];
  rows: any[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function SQTable({ columns, rows }: SQTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      //columnFilters,
      globalFilter,
      sorting,
    },
    //onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    //getFacetedUniqueValues: getFacetedUniqueValues(),
    // getFacetedMinMaxValues: getFacetedMinMaxValues(),
    //debugTable: true,
    // debugHeaders: true,
    //debugColumns: false,
  });

  return (
    <div className="bg-slate-50 container mx-auto min-h-screen">
      <div className="flex my-4">
        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          className="border-gray border rounded h-[50px] w-[300px] max-w-full focus:border-purple-800 px-4 focus:outline-purple-800"
        />
      </div>
      <table className="w-full border-collapse ">
        <thead className="bg-purple-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4">
                  {header.isPlaceholder ? null : (
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-center border-b border-gray-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  <div className="flex justify-center items-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(item) => table.setPageIndex(item.selected)}
          pageRangeDisplayed={1}
          pageCount={Math.round(rows.length / 10)}
          breakClassName="w-[20px] h-[20px] flex justify-center items-center ml-2"
          previousLabel="<"
          nextClassName="w-[30px] h-[30px] flex justify-center items-center rounded border border-purple-800 ml-2"
          previousClassName="w-[30px] h-[30px] flex justify-center items-center rounded border border-purple-800 ml-2"
          renderOnZeroPageCount={() => null}
          containerClassName="flex items-center "
          activeClassName="bg-purple-800 text-white"
          pageClassName="w-[30px] h-[30px] flex justify-center items-center rounded border border-purple-800 ml-2"
        />
      </div>
    </div>
  );
}

export default SQTable;
