import { Dispatch, SetStateAction, createContext } from "react";

export interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
