import "./reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./AppRouter.tsx";
import { Provider } from "react-redux";
import { store } from "./appState/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // </StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
);
