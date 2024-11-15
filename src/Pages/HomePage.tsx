import { useState, useContext, ChangeEvent, useEffect } from "react";
import Filter from "../components/Filter/Filter";
import NavBar from "../components/Navigation/NavBar/NavBar";
import { Props } from "../Props/PageProps";
import { useNavigate } from "react-router-dom";
import CardList, { Game } from "../components/CardList/CardList";
import Logo from "../components/Logo/Logo";
import { QuantityContext } from "../contexts/QuantityContext";
import { PageContext } from "../contexts/PageContext";

export const categories = ["String Length", "Alphabetical Order", "Popularity"];

function HomePage({ handleThemeChange, submittedData }: Props) {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedcategory] = useState("Default");

  const [searchValue, setSearchValue] = useState("");

  /*useEffect used to "contain" side effects(last resort) and effects which would otherwise make 
  components impure like changing state of DOM outside of REACT, changing values declared outside 
  of rendering,Mutating(changing) the input itself or fetching data. This is called after every 
  new render caused by dependency change[a,b], once[] or 
  infinite times, no array, and is called setup. Optional cleanup function called after 
  component is dismounted. In strict mode, one extra 
  cycle called during when mounting/dismounting, including inital one,
  but not in subsequent dependency changes. In dependency changes , 
  cleanup function of the old effect is called before the new effect is setup
  This  DOES NOT involve dismounting old component and mounting new one,
  rather effect functions are re-executed. This useEFFECT was not required as
  whatever is inside is not a side effect(except for console.log)!*/
  // useEffect(() => {
  //   controlCategory(selectedCategory);
  //   console.log(selectedCategory);
  // }, [selectedCategory]);

  // const [visibleAlert, setVisibility] = useState(false);

  // Initialize gameQuantities with an empty object

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
    setCurrentPage("/");
    console.log(currentPage);
  }, []);

  // Define the functions for adding and subtracting game quantities
  const handleCartAdd = (gameName: string) => {
    setGameQuantities((prevQuantities) => ({
      ...prevQuantities,
      [gameName]: (prevQuantities[gameName] || 0) + 1,
    }));
  };

  const handleCartSub = (gameName: string) => {
    setGameQuantities((prevQuantities) => ({
      ...prevQuantities,
      [gameName]: Math.max((prevQuantities[gameName] || 0) - 1, 0),
    }));
  };

  const handleGameSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  /*If the result is negative, a is sorted before b.
  If the result is positive, b is sorted before a.
  If the result is 0, no changes are done with the sort order of the two values.*/
  // const controlCategory = (selectedcategory: string) => {
  //   if (selectedcategory === "Popularity") {
  //     const sortedgames = [...games];
  //     sortedgames.sort((a, b) => b.Popularity - a.Popularity);
  //     setGames(sortedgames);
  //   } else if (selectedcategory === "String Length") {
  //     const sortedgames = [...games];
  //     sortedgames.sort((a, b) => {
  //       let x = a.title.length;
  //       let y = b.title.length;
  //       if (x > y) {
  //         return -1;
  //       }
  //       if (x < y) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setGames(sortedgames);
  //   } else if (selectedcategory === "Alphabetical Order") {
  //     const sortedgames = [...games];
  //     sortedgames.sort((a, b) => {
  //       let x = a.title.toLowerCase();
  //       let y = b.title.toLowerCase();
  //       if (x < y) {
  //         return -1;
  //       }
  //       if (x > y) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setGames(sortedgames);
  //   } else {
  //     setGames(games);
  //   }
  // };

  return (
    <div>
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
        handleNavigate={() => navigate("/Review")}
        handleNavigateV2={() => navigate("/SignUp")}
        handleGameSearch={handleGameSearch}
      />
      <Logo heading="Game Galaxy"></Logo>
      <Filter
        onSelectCategory={(category) => {
          setSelectedcategory(category);
        }}
      ></Filter>
      <CardList
        onItemAdd={handleCartAdd}
        onItemSub={handleCartSub}
        searchParam={searchValue}
      />
      <br />
      <br />
    </div>
  );
}
export default HomePage;
