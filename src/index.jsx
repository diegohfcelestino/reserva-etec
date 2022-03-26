import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/css/styles.scss";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        closeOnClick
        newestOnTop={true}
        rtl={false}
        theme="colored"
      />
    </>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
