import { createRoot } from "react-dom/client";
import { App } from "./App/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const renderApp = () =>
  createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
renderApp();
