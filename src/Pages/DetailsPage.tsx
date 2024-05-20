import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Game } from "../components/CardList/CardList";
import { ThemeContext } from "../contexts/ThemeContext";
import GameCarousel from "../components/GameCarousel/GameCarousel";

interface Price {
  id: string;
  current: {
    shop: {
      id: number;
      name: string;
    };
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
    cut: number;
    voucher: string | null;
    flag: string | null;
    drm: { id: number; name: string }[];
    platforms: { id: number; name: string }[];
    timestamp: string;
    expiry: string | null;
    url: string;
  };
}

interface PricesResponse {
  prices: Price[];
}

function DetailsPage() {
  const location = useLocation();
  const [game, setGame] = useState<Game | null>(null);
  const [prices, setPrices] = useState<Price[] | null>([]);

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
      });
  };

  const fetchPrice = async (id: string) => {
    const key = "3283e73041589adafbf3b9cc0072e9d40fb67dd3";
    const url = `https://api.isthereanydeal.com/games/overview/v2?key=${key}`;

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

      const data: PricesResponse = await response.json();

      if (!data.prices || data.prices.length === 0) {
        console.error("No prices found for the game:", data);
        setPrices(null); // Set null if no prices are found
        return;
      }

      const pricesList: Price[] = data.prices;

      setPrices(pricesList);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  // Use useEffect to log the state whenever it changes
  useEffect(() => {
    console.log(prices); // Log the updated state
  }, [prices]); // This effect runs whenever `prices` state changes

  return (
    <div>
      {game ? (
        <>
          <h1>{game.name}</h1>
          {prices ? (
            <>
              <h2>Prices:</h2>
              <ul>
                {prices.map((price) => (
                  <li key={price.id}>
                    <strong>{price.current.shop.name}:</strong> $
                    {price.current.price.amount.toFixed(2)} ({price.current.cut}
                    % off)
                    <br />
                    <a
                      href={price.current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy on {price.current.shop.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Game is either free or was not found</p>
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
  );
}

export default DetailsPage;
