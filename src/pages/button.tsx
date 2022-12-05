import React from "react";
import Button from "../components/button";

function ButtonPage() {
  return (
    <div>
      <Button size="md" className="block">
        Submit
      </Button>
      <Button size="sm" className="block rounded-2xl mt-4">
        Submit
      </Button>
      <Button className="mt-4" kind="danger">
        Submit
      </Button>
    </div>
  );
}

export default ButtonPage;
