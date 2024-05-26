import { Game } from "../CardList/CardList";
import "./GameCarousel.css"
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

interface GameCarouselProps extends Game {
  released: string;
}

function GameCarousel({
  name,
  popularity,
  background_image,
  short_screenshots,
  released,
}: GameCarouselProps) {

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme } = themeContext;
  const generateCarouselItems = () => {
    return short_screenshots.map((screenshot, index) => (
      <div
        key={index}
        className={`carousel-item ${index === 0 ? "active" : ""} `}
      >
        <img
          src={screenshot.image}
          className="d-block  "
          alt={`Screenshot ${index}`}
        />
        <div className="carousel-caption d-none d-md-block">
          {index === 0 ? (
            <>
              <h5>{name}</h5>
              <p>Released {released}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    ));
  };

  const generateIndicators = () => {
    return short_screenshots.map((_, index) => (
      <button
        key={index}
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
        aria-label={`Slide ${index + 1}`}
      ></button>
    ));
  };

  return (
    <div className="outer-container">
      <div
        id="carouselExampleCaptions"
        className="carousel  slide carousel-fade custom-carousel"
        data-bs-theme={theme==="dark"?"dark":"light"}
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">{generateIndicators()}</div>
        <div className="carousel-inner">{generateCarouselItems()}</div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default GameCarousel;
