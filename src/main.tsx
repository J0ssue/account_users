import "antd/dist/antd.less";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./less/main.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
