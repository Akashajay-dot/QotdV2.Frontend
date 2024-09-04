import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GlobalStateProvider } from "./Context/GlobalStateContext";

const container = document.getElementById("root");
const root = createRoot(container);
const GoogleId = process.env.REACT_APP_GOOGLE_CLIENT_ID



root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GoogleId}>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
