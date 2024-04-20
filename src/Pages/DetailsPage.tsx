import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Game } from "../components/CardList/CardList";
import { ThemeContext } from "../contexts/ThemeContext";
import GameCarousel from "../components/GameCarousel/GameCarousel"

interface Price {
  price_new: number;
  price_old: number;
  price_cut: number;
  url: string;
  shop: {
    id: string;
    name: string;
  };
  drm: string[];
}

interface PricesData {
  list: Price[];
  urls: {
    game: string;
  };
}

function DetailsPage() {
  const location = useLocation();
  const [game, setGame] = useState<Game | null>(null);
  const [prices, setPrices] = useState<PricesData | null>(null);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme } = themeContext;

  useEffect(() => {
    if (location.state && location.state.game) {
      const gameFromState = location.state.game;
      console.log(gameFromState)
      setGame(gameFromState);
      fetchPlain(gameFromState.name);
    }
  }, [location.state]);

  const fetchPlain = (gameName: string) => {
    const cleanTitle = gameName.replace(/\(\d+\)/, "").trim();

    axios
      .get("https://api.isthereanydeal.com/v02/game/plain/", {
        params: {
          key: "3283e73041589adafbf3b9cc0072e9d40fb67dd3",
          title: cleanTitle,
        },
      })
      .then((response) => {
        fetchPrice(response.data.data.plain);
      })
      .catch((error) => {
        console.error("Error fetching prices:", error);
      });
  };

  const fetchPrice = (plain: string) => {
    axios
      .get("https://api.isthereanydeal.com/v01/game/prices/", {
        params: {
          key: "3283e73041589adafbf3b9cc0072e9d40fb67dd3",
          plains: plain,
        },
      })
      .then((response) => {
        const pricesData: PricesData = response.data.data[plain];
        setPrices(pricesData);
      })
      .catch((error) => {
        console.error("Error fetching prices:", error);
      });
  };

  return (
    <div>
      {game ? (
        <>
          <h1>{game.name}</h1>
          {prices ? (
            <>
              <h2>Prices:</h2>
              <ul>
                {prices.list.map((price) => (
                  <li key={price.url}>
                    <strong>{price.shop.name}:</strong> $
                    {price.price_new.toFixed(2)} ({price.price_cut}% off)
                    <br />
                    <a
                      href={price.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy on {price.shop.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading prices...</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailsPage;
