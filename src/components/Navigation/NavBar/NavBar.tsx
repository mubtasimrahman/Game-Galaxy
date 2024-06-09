import HamBurger from "../HamBurger/HamBurger";
import { ChangeEvent, MouseEventHandler, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiOutlineShoppingCart } from "react-icons/Ai";
import { HiHome } from "react-icons/Hi";
import { BiSolidCommentDots } from "react-icons/Bi";
import { BiSolidDonateHeart } from "react-icons/Bi";
import { MdLightMode } from "react-icons/Md";
import { MdNightlight } from "react-icons/Md";
import { FaSearch } from "react-icons/Fa";
import { SiGnuprivacyguard } from "react-icons/Si";
import { Tooltip } from "react-tooltip";
import "./NavBar.css";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { PageContext } from "../../../contexts/PageContext";

interface Props {
  cartItems: string[];
  children?: ReactNode;
  itemQuantity: number[];
  userName: string | undefined;
  RemoveAll: () => void;
  handleThemeChange: () => void;
  handleNavigateV2: MouseEventHandler<HTMLButtonElement>;
  handleNavigate: MouseEventHandler<HTMLButtonElement>;

  handleGameSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

function NavBar({
  cartItems,
  itemQuantity,
  userName,
  RemoveAll,
  handleThemeChange,
  handleNavigate,
  handleGameSearch,
  handleNavigateV2,
}: Props) {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme } = themeContext;

  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("PageContext is not available");
  }

  const navigate = useNavigate();

  const { currentPage, setCurrentPage } = pageContext;

  const CartItemSort = (item: string, index: number) => {
    if (itemQuantity[index] > 0) {
      return (
        <li key={index}>
          <a className="dropdown-item" href="#">
            {item} : {itemQuantity[index]}
          </a>
        </li>
      );
    }
    return null;
  };
  const sum = itemQuantity.reduce((accumulator, num) => accumulator + num, 0);

  const DisplayName = () => {
    if (userName) {
      // Only render if userName is defined
      return <span className={styles.submittedName}>Hello {userName} !</span>;
    }
  };

  return (
    <div className="sticky-top container-fluid">
      <div className="d-flex justify-content-between align-items-center">
        <HamBurger></HamBurger>
        <nav
          className={`navbar bg-${
            theme === "dark" ? "dark" : "light"
          } bg-gradient border-bottom`}
          data-bs-theme="dark"
          style={{ flex: 1 }}
        >
          <div className="container-fluid  ">
            <div>
              <button
                className={`btn ${styles.buttonSpacingRight}`}
                type="button"
                onClick={handleNavigate}
                aria-label={
                  currentPage === "/"
                    ? "Leave a Review"
                    : currentPage === "/Review"
                    ? "Go Back to HomePage"
                    : "Go Back to HomePage"
                }
                data-tooltip-id="first-tooltip"
                data-tooltip-variant={theme === "dark" ? "light" : "dark"}
                data-tooltip-content={
                  currentPage === "/"
                    ? "Leave a Review"
                    : currentPage === "/Review"
                    ? "Go Back to HomePage"
                    : "Go Back to HomePage"
                }
              >
                <Tooltip id="first-tooltip" />
                {currentPage === "/" ? (
                  <BiSolidCommentDots
                    className={
                      theme === "dark"
                        ? styles.darkModeButton
                        : styles.lightModeButton
                    }
                    size={35}
                  />
                ) : currentPage === "/Review" ? (
                  <HiHome
                    className={
                      theme === "dark"
                        ? styles.darkModeButton
                        : styles.lightModeButton
                    }
                    size={35}
                  />
                ) : (
                  <HiHome
                    className={
                      theme === "dark"
                        ? styles.darkModeButton
                        : styles.lightModeButton
                    }
                    size={35}
                  />
                )}
              </button>

              <button
                className="btn "
                type="button"
                onClick={handleNavigateV2}
                aria-label={
                  currentPage === "/" ? "Sign Up or Log In" : "Leave a Review"
                }
                data-tooltip-id="second-tooltip"
                data-tooltip-variant={theme === "dark" ? "light" : "dark"}
                data-tooltip-content={
                  currentPage === "/" ? "Sign Up or Log In" : "Leave a Review"
                }
              >
                <Tooltip id="second-tooltip" />
                {currentPage === "/" ? (
                  <SiGnuprivacyguard
                    className={
                      theme === "dark"
                        ? styles.darkModeButton
                        : styles.lightModeButton
                    }
                    size={35}
                  />
                ) : currentPage === "/Review" ? (
                  <SiGnuprivacyguard
                    className={
                      theme === "dark"
                        ? styles.darkModeButton
                        : styles.lightModeButton
                    }
                    size={35}
                  />
                ) : (
                  <BiSolidCommentDots
                    className={
                      theme === "dark"
                        ? styles.darkModeButton
                        : styles.lightModeButton
                    }
                    size={35}
                  />
                )}
              </button>

              {currentPage === "/" ? (
                <div className={`${styles.searchBox} `}>
                  <button
                    className={styles.btnSearch}
                    aria-label="Search Games"
                    type="button"
                    data-tooltip-id="third-tooltip"
                    data-tooltip-variant={theme === "dark" ? "light" : "dark"}
                    data-tooltip-place= "bottom"
                    data-tooltip-content="Search Games"
                  >
                    <FaSearch
                      className={
                        theme === "dark"
                          ? styles.darkModeButton
                          : styles.lightModeButton
                      }
                      size={35}
                    />
                  </button>
                  <Tooltip id="third-tooltip" />
                  <input
                    type="text"
                    className={
                      theme === "dark"
                        ? styles.inputSearchDark
                        : styles.inputSearchLight
                    }
                    onChange={handleGameSearch}
                    placeholder="Search Games"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            {DisplayName()}
            <div>
              {currentPage === "/" && (
                <>
                  <button
                    className="btn "
                    type="button"
                    aria-label="Donate"
                    data-tooltip-id="fourth-tooltip"
                    data-tooltip-variant={theme === "dark" ? "light" : "dark"}
                    data-tooltip-content="Donate"
                    onClick={() => navigate("/Paypal")}
                  >
                    <BiSolidDonateHeart
                      className={
                        theme === "dark"
                          ? styles.darkModeButton
                          : styles.lightModeButton
                      }
                      size={35}
                    />
                  </button>
                  <Tooltip id="fourth-tooltip" />
                </>
              )}

              <button
                className="btn "
                type="button"
                onClick={() => {
                  handleThemeChange();
                }}
                aria-label={
                  theme === "dark"
                    ? "Switch Themes - Currently Dark Mode"
                    : "Switch Themes - Currently Light Mode"
                }
                data-tooltip-id="fifth-tooltip"
                data-tooltip-variant={theme === "dark" ? "light" : "dark"}
                data-tooltip-content={
                  theme === "dark"
                    ? "Switch Themes - Currently Dark Mode"
                    : "Switch Themes - Currently Light Mode"
                }
              >
                <Tooltip id="fifth-tooltip" />
                {theme === "light" && (
                  <MdNightlight
                    size={35}
                    className={styles.lightModeButton}
                  ></MdNightlight>
                )}
                {theme === "dark" && (
                  <MdLightMode
                    size={35}
                    className={styles.darkModeButton}
                  ></MdLightMode>
                )}
              </button>
              <button
                className={`btn ${styles.buttonSpacingLeft}`}
                type="button"
                aria-label="Shopping Cart"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                aria-controls="offcanvasCart"
                data-tooltip-id="sixth-tooltip"
                data-tooltip-variant={theme === "dark" ? "light" : "dark"}
                data-tooltip-content="Shopping Cart"
              >
                <Tooltip id="sixth-tooltip" />
                <AiOutlineShoppingCart
                  size={35}
                  className={
                    theme === "dark"
                      ? styles.darkModeButton
                      : styles.lightModeButton
                  }
                ></AiOutlineShoppingCart>
              </button>
            </div>
          </div>

          <div
            className={`offcanvas offcanvas-end ${styles.Canvas}`}
            tabIndex={-1}
            id="offcanvasCart"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Total Items:{sum}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div>
                Some text as placeholder. In real life you can have the elements
                you have chosen. Like, text, images, lists, etc.
              </div>
              <div className="dropdown mt-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Cart Items
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {cartItems.map(CartItemSort)}
                </ul>
                <button
                  type="button"
                  className="btn btn-outline-danger "
                  onClick={RemoveAll}
                >
                  Remove All Items
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
/* OnClick hast to setCurrentPage as well as have different handleNavigate depending on currentPage */
