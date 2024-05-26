import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Game } from "../components/CardList/CardList";
import { ThemeContext } from "../contexts/ThemeContext";
import GameCarousel from "../components/GameCarousel/GameCarousel";
import "./PageStyles/DetailsPage.css";
import styles from "./PageStyles/DetailsPage.module.css"

interface Price {
  cut: number;
  drm: { id: number; name: string }[];
  expiry: string;
  flag: string | null;
  historyLow: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  platforms: { id: number; name: string }[];
  price: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  regular: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  shop: {
    id: number;
    name: string;
  };
  storeLow: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  timestamp: string;
  url: string;
  voucher: string | null;
}

function DetailsPage() {
  const location = useLocation();
  const [game, setGame] = useState<Game | null>(null);
  const [prices, setPrices] = useState<Price[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme } = themeContext;

  useEffect(() => {
    if (location.state && location.state.game) {
      const gameFromState = location.state.game;
      console.log(location);
      console.log(location.state);
      console.log(gameFromState);
      setGame(gameFromState);
      fetchId(gameFromState.name);
    }
  }, [location.state]);

  const fetchId = (gameName: string) => {
    const cleanTitle = gameName.replace(/\(\d+\)/, "").trim();

    axios
      .get("https://api.isthereanydeal.com/games/lookup/v1", {
        params: {
          key: "3283e73041589adafbf3b9cc0072e9d40fb67dd3",
          title: cleanTitle,
        },
      })
      .then((response) => {
        console.log(response.data.game.id);
        fetchPrice(response.data.game.id);
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
        setLoading(false); // Stop loading if there's an error
      });
  };

  const fetchPrice = async (id: string) => {
    const key = "3283e73041589adafbf3b9cc0072e9d40fb67dd3";
    const url = `https://api.isthereanydeal.com/games/prices/v2?key=${key}&country=CA&nondeals=true`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify([id]), // JSON.stringify ensures the body is sent as JSON
        headers: {
          // Intentionally omit 'Content-Type' to make it a simple request
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (!Array.isArray(data) || data.length === 0 || !data[0].deals) {
        console.error("Unexpected response structure:", data);
        setPrices([]);
      } else {
        const pricesList: Price[] = data[0].deals;
        setPrices(pricesList);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      setPrices([]);
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
    }
  };

  useEffect(() => {
    console.log(prices); // Log the updated state
  }, [prices]); // This effect runs whenever `prices` state changes

  return (
    <>
      <h1  className={`heading ${theme==="light"?styles.lightMode:styles.darkMode}`}>{game?.name}</h1>
      <div className="d-flex justify-content-around">
        {loading ? (
          <p>Loading prices...</p>
        ) : game ? (
          <>
            {prices && prices.length > 0 ? (
              <>
                <table
                  className={`table ${
                    theme === "light" ? "table-primary" : "table-secondary"
                  } align-middle table-hover table-borderless table-radius`}
                >
                  <thead className={`table-${
                    theme === "light" ? "light" : "dark"
                  } `}>
                    <tr>
                      <th scope="col">Shop</th>
                      <th scope="col">Price</th>
                      <th scope="col">Normal Price</th>
                      <th scope="col">Platforms</th>
                      <th scope="col">DRM</th>
                      <th scope="col">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((price, index) => (
                      <tr
                        key={price.url}
                        className={index === 0 ? "table-active" : ""}
                      >
                        <td>{price.shop.name}</td>
                        <td>
                          ${price.price.amount.toFixed(2)} ({price.cut}% off)
                        </td>
                        <td>${price.regular.amount.toFixed(2)}</td>
                        <td>
                          {price.platforms
                            .map((platform) => platform.name)
                            .join(", ")}
                        </td>
                        <td>{price.drm.map((d) => d.name).join(", ")}</td>
                        <td>
                          <a
                            href={price.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                          >
                            Buy on {price.shop.name}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>Game is either Free or was not found</p>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
        {game && (
          <GameCarousel
            name={game.name}
            popularity={game.popularity}
            background_image={game.background_image}
            short_screenshots={game.short_screenshots}
            released={game.released}
          />
        )}
      </div>
    </>
  );
}

export default DetailsPage;
