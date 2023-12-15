import NavBar from "../components/Navigation/NavBar/NavBar";
import { Props } from "../Props/PageProps";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { QuantityContext } from "../contexts/QuantityContext";
import { PageContext } from "../contexts/PageContext";
import Form, { DataForm } from "../components/Form/Form";

function SignUpPage({
  handleThemeChange,
  submittedData,
  setSubmittedData,
}: Props) {
  const navigate = useNavigate();

  const quantityContext = useContext(QuantityContext);
  if (!quantityContext) {
    throw new Error("QuantityContext is not available");
  }
  const { gameQuantities, setGameQuantities } = quantityContext;

  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("PageContext is not available");
  }
  const { currentPage, setCurrentPage } = pageContext;

  useEffect(() => {
    setCurrentPage("/SignUp");
  }, []);

  const handleFormSubmit = (data: DataForm) => {
    // Handle the submitted form data here, e.g., send it to an API, update state, etc.
    console.log(data);
    setSubmittedData(data);
  };

  return (
    <>
      <NavBar
        cartItems={Object.keys(gameQuantities)}
        itemQuantity={Object.values(gameQuantities)}
        userName={submittedData?.name}
        RemoveAll={() => {
          setGameQuantities(
            Object.keys(gameQuantities).reduce(
              (acc, gameName) => ({ ...acc, [gameName]: 0 }),
              {}
            )
          );
        }}
        handleThemeChange={handleThemeChange}
        handleNavigate={() => navigate("/")}
        handleNavigateV2={() => navigate("/Review")}
        handleGameSearch={() => {
          throw new Error("Function only implemented in HomePage");
        }}
      />
      <Form onSubmitUser={handleFormSubmit}></Form>
    </>
  );
}
export default SignUpPage;
