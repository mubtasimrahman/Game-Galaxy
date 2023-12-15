import { DataForm } from "../components/Form/Form";

export interface Props {
  handleThemeChange: () => void;
  submittedData: DataForm | null;
  setSubmittedData: React.Dispatch<React.SetStateAction<DataForm | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}
