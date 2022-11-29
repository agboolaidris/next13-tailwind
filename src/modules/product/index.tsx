import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import SQTable from "../../components/table";
import { makeData, Person } from "./data";

function ProductModule() {
  //const rows = makeData(1000);
  const [rows, setData] = React.useState(() => makeData(1000));
  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 60,
      enableSorting: false,
    },
    {
      accessorKey: "firstName",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorFn: (row) => row.lastName,
      accessorKey: "lastName",
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
    },
    {
      accessorKey: "age",
      header: () => "Age",
      size: 50,
    },
    {
      accessorKey: "visits",
      header: () => <span>Visits</span>,
      size: 50,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "progress",
      header: "Profile Progress",
      size: 80,
    },
  ];
  return (
    <div>
      <SQTable rows={rows} columns={columns} />
    </div>
  );
}

export default ProductModule;
