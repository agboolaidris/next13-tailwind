import React from "react";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  error?: string;
}
const TextArea = ({ containerClassName, error, ...props }: TextAreaProps) => {
  return (
    <div>
      <div
        className={`border-purple-600 border h-[50px] focus-within:ring-purple-700 focus-within:ring-2 text-sm rounded ${containerClassName}`}
      >
        <input
          {...props}
          className="bg-transparent outline-none border-none w-full h-full px-3 "
        />
      </div>
      {error && <span>{JSON.stringify(error)}</span>}
    </div>
  );
};

export default TextArea;
