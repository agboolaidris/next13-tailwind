import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

const TextInput = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
};

export default TextInput;
