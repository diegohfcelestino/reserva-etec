import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
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
