import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";
import { AudioProvider } from "./context/AudioContext";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <AudioProvider>
    <AppRouter />
  </AudioProvider>
  //</React.StrictMode>
);
