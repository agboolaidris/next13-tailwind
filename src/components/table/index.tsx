import React, { useEffect, useState } from "react";
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
  SortingState,
} from "@tanstack/react-table";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import ReactPaginate from "react-paginate";
import { Filter } from "./t";
interface SQTableProps {
  columns: ColumnDef<any>[];
  rows: any[];
}

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
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

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
function SQTable({ columns, rows }: SQTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [dateColumn, setDateColumn] = useState<
    Column<any, unknown> | undefined
  >(undefined);

  const table = useReactTable({
    data: rows,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  useEffect(() => {
    let column = undefined;
    table.getHeaderGroups().forEach((headerGroup) =>
      headerGroup.headers.forEach((header) => {
        if (header.column.id === "createdAt") {
          column = header.column;
        }
      })
    );
    setDateColumn(column);
  }, [table]);

  return (
    <div className="bg-slate-50 container mx-auto min-h-screen">
      <div className="flex p-4 justify-between">
        <Filter column={dateColumn} table={table} />

        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          placeholder="can’t find something? search it here!"
          className="border-purple-800 text-purple-800 placeholder:text-purple-900 border rounded h-[50px] w-[400px] max-w-full focus:border-purple-800 px-4 focus:outline-purple-800"
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
          pageCount={Math.round(table.getPageCount() / 10)}
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
