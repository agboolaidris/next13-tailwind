import React, {
  ReactNode,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import style from "./style.module.css";
import { cva, VariantProps } from "class-variance-authority";

const buttonStyle = cva("rounded", {
  defaultVariants: {
    kind: "success",
    size: "md",
  },
  variants: {
    kind: {
      success: "bg-green-500 hover:bg-green-600 text-white",
      danger: "bg-red-500 hover:bg-red-600 text-white",
    },
    size: {
      none: "",
      sm: "p-2 text-xs",
      md: "p-4 text-sm",
    },
  },
});

interface ButtonProps
  extends VariantProps<typeof buttonStyle>,
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
  children: ReactNode;
}

function Button({ children, className, kind, size }: ButtonProps) {
  const _className = buttonStyle({ className, kind, size });
  return <button className={_className}>{children}</button>;
}

export default Button;
