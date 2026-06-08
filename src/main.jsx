import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* O BrowserRouter habilita a navegação entre páginas sem recarregar o navegador. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
