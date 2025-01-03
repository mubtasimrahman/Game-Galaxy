import HomePage from "../Pages/HomePage";
import { useState,lazy } from "react";
const ReviewPage = lazy(() => import('../Pages/ReviewPage'));
const SignUpPage = lazy(() => import('../Pages/SignUpPage'));
const DetailsPage = lazy(() => import('../Pages/DetailsPage'));
const PayPal = lazy(() => import('../components/PayPal/PayPal'));
import { Route, Routes, HashRouter } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { QuantityContext } from "../contexts/QuantityContext";
import { PageContext } from "../contexts/PageContext";
import styles from "./App.module.css";
import { DataForm } from "../components/Form/Form";
import "./App.css";


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
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.style.backgroundColor =
      newTheme === "dark"
        ? "var(--dark-mode-background)"
        : "var(--light-mode-background)";
  };

  return (
    <div className={styles.padding}>
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
                <Route path="/PayPal" element={<PayPal></PayPal>}></Route>
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
