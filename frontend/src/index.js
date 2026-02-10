import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "./context/ThemeContext";

// ✅ FIRST: create root
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// ✅ THEN: render
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);




