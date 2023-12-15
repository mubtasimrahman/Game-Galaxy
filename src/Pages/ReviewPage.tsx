import Review from "../components/Review/Review";
import NavBar from "../components/Navigation/NavBar/NavBar";
import { Props } from "../Props/PageProps";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../contexts/PageContext";
import { QuantityContext } from "../contexts/QuantityContext";

function ReviewPage({ handleThemeChange, submittedData }: Props) {
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
    setCurrentPage("/Review");
  }, []);

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
        handleNavigateV2={()=>navigate("/SignUp")}
        handleGameSearch={() => {
          throw new Error("Function only implemented in HomePage");
        }}
      />
      <Review></Review>
    </>
  );
}

export default ReviewPage;
