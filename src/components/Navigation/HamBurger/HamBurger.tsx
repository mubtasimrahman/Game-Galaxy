import { ThemeContext } from "../../../contexts/ThemeContext";
import { useContext, useState } from "react";
import "./HamBurger.css";
import { IoIosArrowDropdownCircle } from "react-icons/Io";
import styles from "../NavBar/NavBar.module.css";
import { SiGnuprivacyguard } from "react-icons/Si";
import { BiSolidCommentDots } from "react-icons/Bi";

function HamBurger() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme, setTheme } = themeContext;

  return (
    <div className="custom-dropdown">
      <button className="btn " type="button" onClick={toggleDropdown}>
        <IoIosArrowDropdownCircle
          size={35}
          className={
            theme === "dark" ? styles.darkModeButton : styles.lightModeButton
          }
        ></IoIosArrowDropdownCircle>
      </button>
      <ul
        className={`${
          theme === "dark"
            ? "custom-dropdown-menu"
            : "custom-dropdown-menu-light"
        } ${isDropdownOpen ? "show" : ""}`}
      >
        <li>
          <a href="" className="custom-dropdown-item">
            <SiGnuprivacyguard
              size={30}
              className={
                theme === "dark"
                  ? styles.darkModeButton
                  : styles.lightModeButton
              }
            ></SiGnuprivacyguard>
          </a>
        </li>
        <li>
          <a href="" className="custom-dropdown-item">
            <BiSolidCommentDots
              size={30}
              className={
                theme === "dark"
                  ? styles.darkModeButton
                  : styles.lightModeButton
              }
            ></BiSolidCommentDots>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default HamBurger;
