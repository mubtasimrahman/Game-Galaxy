import "./Logo.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const Logo = ({ heading }: { heading: string }) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme } = themeContext;

  return (
    <div className="logoContainer">
      <header
        className={theme === "dark" ? "headerDarkMode" : "headerLightMode"}
      >
        <h1 className="title " title={heading}>
          {heading}
        </h1>
      </header>
    </div>
  );
};

export default Logo;
