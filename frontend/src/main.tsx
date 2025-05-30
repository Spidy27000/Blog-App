
import ReactDOM from "react-dom/client";

import App from "./Pages/App";
import './index.css'

import { StrictMode } from "react";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
