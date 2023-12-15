import { ReactNode } from "react";

/*children allows us to pass input as child to component
ReactNode type allows us to pass html content as child to component*/
interface Props {
  children: ReactNode;
}

//role alert provides context in assitive techs like screen readers
const Alert = ({ children }: Props) => {
  return (
    <div className="alert alert-danger" role="alert">
      {children}
    </div>
  );
};

export default Alert;
