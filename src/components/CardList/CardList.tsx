import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CardList.css";
import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/Bs";
import styles from "./CardList.module.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

export interface Game {
  name: string;
  popularity: number;
  background_image: string;
}

interface Props {
  onItemAdd: (item: string) => void;
  onItemSub: (item: string) => void;
  searchParam: string;
}

function CardList({ onItemAdd, onItemSub, searchParam }: Props) {
  const navigate = useNavigate();

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme } = themeContext;

  const [games, setGames] = useState<Game[]>([]);
  const [gameQuantities, setGameQuantities] = useState<{
    [key: string]: number;
  }>({});

  const [timeTaken, setTimeTaken] = useState(0);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Make an API request to Rawg.io to fetch game data
    const startTime = performance.now();
    axios
      .get("https://api.rawg.io/api/games", {
        params: {
          key: "3ce4043b51544c8baebe3137fab208ad", // Replace with your Rawg.io API key
          search: searchParam,
        },
      })
      .then((response) => {
        setGames(response.data.results);
        console.log(response.data.results);
        console.log({ searchParam });
        // Initialize game quantities with 0 for all fetched games
        const initialQuantities: Record<string, number> = {};
        response.data.results.forEach((game: Game) => {
          initialQuantities[game.name] = 0;
        });
        setGameQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      })
      .finally(() => {
        // Calculate and log the timeTaken
        const endTime = performance.now();
        const timeTaken = endTime - startTime;
        console.log("timeTaken in finally block:", timeTaken);

        // Set the timeTaken state
        setTimeTaken(timeTaken);
      });
  }, [searchParam]);

  const handleAddClick = (gameName: string) => {
    setGameQuantities((prevQuantities) => ({
      ...prevQuantities,
      [gameName]: prevQuantities[gameName] + 1,
    }));
    onItemAdd(gameName); // Call the external add function
  };

  const handleSubtractClick = (gameName: string) => {
    if (gameQuantities[gameName] > 0) {
      setGameQuantities((prevQuantities) => ({
        ...prevQuantities,
        [gameName]: prevQuantities[gameName] - 1,
      }));
      onItemSub(gameName); // Call the external subtract function
    }
  };

  useEffect(() => {
    const timeoutDuration = timeTaken + 1000; // Set the duration in milliseconds (adjust as needed)

    const timeoutId = setTimeout(() => {
      // Switch to actual cards after the timeout
      setImageLoaded(true);
    }, timeoutDuration);

    // Clear the timeout if the component unmounts or when the image is loaded
    return () => {
      clearTimeout(timeoutId);
      setImageLoaded(false);
    };
  }, [searchParam]);

  return (
    <div className="card-list">
      {games.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center w-100 ">
          <div
            className={`spinner-border ${
              theme === "dark" ? "text-light" : "text-dark"
            }`}
            role="status"
            style={{width: 100 ,height:100}}
            
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        games.map((game) => (
          <div
            key={game.name}
            className={`card ${
              theme === "dark" ? "text-bg-secondary" : "text-bg-light"
            } ${imageLoaded ? "image-loaded" : ""}`}
            onClick={() =>
              navigate(`/details/${game.name}`, { state: { game } })
            }
          >
            {imageLoaded ? (
              <>
                <img
                  src={game.background_image}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{game.name}</h5>
                  <div className="card-footer bg-transparent">
                    <div className="item-buttons">
                      <button
                        className="btn"
                        onClick={() => handleAddClick(game.name)}
                      >
                        <BsFillCartPlusFill
                          size={25}
                          className={
                            theme === "light" ? styles.light : styles.dark
                          }
                        />
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleSubtractClick(game.name)}
                      >
                        <BsFillCartDashFill
                          size={25}
                          className={
                            theme === "light" ? styles.light : styles.dark
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // (
              //   <div className="card-placeholder" aria-hidden="true">
              //     <div className="card-body">
              //       <h5 className="card-title placeholder-glow">
              //         <span className="placeholder col-6"></span>
              //       </h5>
              //       <p className="card-text placeholder-glow">
              //         <span className="placeholder col-7"></span>
              //         <span className="placeholder col-4"></span>
              //         <span className="placeholder col-4"></span>
              //         <span className="placeholder col-6"></span>
              //         <span className="placeholder col-8"></span>
              //       </p>
              //       <a
              //         className="btn btn-primary disabled placeholder col-6"
              //         aria-disabled="true"
              //       ></a>
              //     </div>
              //   </div>
              // )
              ""
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CardList;
