import { Dispatch, SetStateAction, createContext } from "react";

export interface PageContextType {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
export const PageContext = createContext<PageContextType | undefined>(
  undefined
);