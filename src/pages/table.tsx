import React from "react";
import SQTable from "../components/table";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 60,
  },
  {
    accessorKey: "firstName",
    cell: (info) => info.getValue(),
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
function Table() {
  return (
    <div>
      <SQTable columns={columns} rows={defaultData} />
    </div>
  );
}

export default Table;
