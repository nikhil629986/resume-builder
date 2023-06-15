import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="section1">
    <div className="Select_your_classname">Select Your Section</div>
      <div className="app_component"><App /></div>
      
      </div>
    </BrowserRouter>
  </React.StrictMode>
);