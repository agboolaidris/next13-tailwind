import React from "react";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
export type Ref = HTMLInputElement;

const TextField = React.forwardRef<Ref, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <div
          className={`border-purple-600 border h-[50px] focus-within:ring-purple-700 focus-within:ring-2 text-sm rounded ${className}`}
        >
          <input
            ref={ref}
            className="bg-transparent outline-none border-none w-full h-full px-3 "
            {...props}
          />
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

TextField.displayName = "";

export default TextField;
