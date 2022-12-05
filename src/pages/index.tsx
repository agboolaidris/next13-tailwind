import React, { useMemo, useState } from "react";
import Card from "../components/card/indtex";
import TextInput from "../components/textField";
import { makeData, Person } from "../modules/product/data";

function Index() {
  const [data, setData] = useState<Person[]>(makeData(100));
  const [textChange, setTextChange] = useState("");
  
  const filterData: Person[] = useMemo(() => {
    if (textChange.length < 1) return data;
    else {
      return data.filter((item) =>
        item.firstName.toLowerCase().includes(textChange.toLowerCase())
      );
    }
  }, [data, textChange]);

  return (
    <div>
      <TextInput
        value={textChange}
        onChange={(e) => setTextChange(e.target.value)}
        placeholder="search anything"
      />
      <div className="flex flex-wrap">
        {filterData.map((item, index) => (
          <Card title={item.firstName} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Index;
