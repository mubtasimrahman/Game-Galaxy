import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.css"; //originally imported index.css
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../scss/custom.scss"
import App from "./App/App";

//Using ReactDOM library to render a component tree inside an html element with id "root"
//REACTDOM could have been React Native, for mobile apps
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //App component wrapped by Component StrictMode makes up the component tree(Built in Component)
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
