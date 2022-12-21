import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { applyTheme, IVariableType } from "../themes/base";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<IVariableType>("base2");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return <Component {...pageProps} />;
}
