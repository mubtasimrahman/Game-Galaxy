import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  colour?: string; // ? means optional prop
}

const Button1 = ({ children, onClick, colour = "info" }: Props) => {
  return (
    <button type="button" className={"btn btn-sm btn-" + colour} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button1;
