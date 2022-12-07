import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`h-[50px] rounded w-full bg-purple-700  text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
