import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "./posterpage.scss";
import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
