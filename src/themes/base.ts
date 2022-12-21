const variables = {
  primary: "#61DAFB",
  secondary: "#254E70",
  negative: "#e45b78",
  positive: "#A3D9B1",
  textPrimary: "#333",
  backgroundPrimary: "#efefef",
  backgroundSecondary: "#F6F9FC",
};
const variables2 = {
  primary: "#e45b78",
  secondary: "#254E70",
  negative: "#e45b78",
  positive: "#A3D9B1",
  textPrimary: "#333",
  backgroundPrimary: "#070",
  backgroundSecondary: "#F6F9FC",
};

const themes = {
  base: variables,
  base2: variables2,
};

export type IVariableType = keyof typeof themes;

interface ITheme {
  [key: string]: string;
}
interface IThemes {
  [key: string]: ITheme;
}

interface IMappedTheme {
  [key: string]: string | null;
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
  return {
    "--color-primary": variables.primary || "",
    "--color-secondary": variables.secondary || "",
    "--color-positive": variables.positive || "",
    "--color-negative": variables.negative || "",
    "--color-text-primary": variables.textPrimary || "",
    "--background-primary": variables.backgroundPrimary || "",
    "--background-sec": variables.backgroundSecondary || "",
  };
};

export const applyTheme = (theme: IVariableType): void => {
  const themeObject: IMappedTheme = mapTheme(themes[theme]);
  if (!themeObject) return;

  const root = document.documentElement;

  Object.keys(themeObject).forEach((property) => {
    root.style.setProperty(property, themeObject[property]);
  });
};
