import React, { useState } from "react";
import { Column, Table } from "@tanstack/react-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
export function Filter({
  column,
  table,
}: {
  column?: Column<any, unknown>;
  table: Table<any>;
}) {
  const [startDate, setStartDate] = useState(new Date());

  if (!column) return null;

  const handleChange = (date: Date) => {
    column.setFilterValue((old: [number, number]) => [
      DateTime.fromJSDate(date).toMillis(),
      ,
      old?.[1],
    ]);
    setStartDate(date);
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      className="border-purple-800 text-purple-800 border rounded h-[50px] w-[200px] max-w-full focus:border-purple-800 px-4 focus:outline-purple-800"
    />
  );

  {
    /* <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded text-black"
        list={column.id + "list"}
      /> */
  }
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
