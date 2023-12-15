import {  createContext } from "react";

export interface QuantityContextType {
  gameQuantities: {
    [key: string]: number;
  };
  setGameQuantities: React.Dispatch<React.SetStateAction<{
    [key: string]: number;
}>>;
}
export const QuantityContext = createContext<QuantityContextType | undefined>(
  undefined
);
