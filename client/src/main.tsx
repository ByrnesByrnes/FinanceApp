import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PortfolioProvider } from "modules/state/portfolio/portfolio-context.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "modules/route/router/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PortfolioProvider>
      <RouterProvider router={router} />
    </PortfolioProvider>
  </React.StrictMode>,
);
