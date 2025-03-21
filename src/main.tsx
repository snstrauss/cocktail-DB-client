import "./reset.css";
import "./common/colors.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./AppRouter.tsx";
import { Provider } from "react-redux";
import { store } from "./appState/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
