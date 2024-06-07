import HomePage from "../Pages/HomePage";
import { useState } from "react";
import ReviewPage from "../Pages/ReviewPage";
import SignUpPage from "../Pages/SignUpPage";
import DetailsPage from "../Pages/DetailsPage";
import PayPal from "../components/PayPal/PayPal";
import { Route, Routes, HashRouter } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { QuantityContext } from "../contexts/QuantityContext";
import { PageContext } from "../contexts/PageContext";
import styles from "./App.module.css";
import { DataForm } from "../components/Form/Form";
import "./App.css";
import "../../scss/custom.scss"

export interface Games {
  title: string;
  quantity: number;
  Popularity: number;
  link: string;
}
function App() {
  const [theme, setTheme] = useState("dark");
  const [currentPage, setCurrentPage] = useState("HomePage");
  const [gameQuantities, setGameQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [submittedData, setSubmittedData] = useState<DataForm | null>(null);

  const handleThemeChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className={theme === "dark" ? styles.darkMode : styles.lightMode}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <QuantityContext.Provider value={{ gameQuantities, setGameQuantities }}>
          <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            <HashRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      handleThemeChange={handleThemeChange}
                      submittedData={submittedData}
                      setSubmittedData={setSubmittedData}
                      setCurrentPage={setCurrentPage}
                    />
                  }
                ></Route>
                <Route
                  path="/Review"
                  element={
                    <ReviewPage
                      handleThemeChange={handleThemeChange}
                      submittedData={submittedData}
                      setSubmittedData={setSubmittedData}
                      setCurrentPage={setCurrentPage}
                    />
                  }
                ></Route>
                <Route
                  path="/SignUp"
                  element={
                    <SignUpPage
                      handleThemeChange={handleThemeChange}
                      submittedData={submittedData}
                      setSubmittedData={setSubmittedData}
                      setCurrentPage={setCurrentPage}
                    />
                  }
                ></Route>
                <Route
                  path="/PayPal"
                  element={<PayPal></PayPal>}
                ></Route>
                <Route
                  path="/details/:id"
                  element={<DetailsPage></DetailsPage>}
                ></Route>
                <Route />
              </Routes>
            </HashRouter>
          </PageContext.Provider>
        </QuantityContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
