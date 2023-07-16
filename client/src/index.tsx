import React from "react";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import "./index.css";
import App from "./app/App";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
