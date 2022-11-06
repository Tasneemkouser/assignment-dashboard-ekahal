import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { FirebaseAuthProvider } from "./providers/FirebaseAuthProvider";
import SeasonalTemperatureProvider from "./providers/SeasonalTemperatureProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <FirebaseAuthProvider>
        <SeasonalTemperatureProvider>
          <App />
        </SeasonalTemperatureProvider>
      </FirebaseAuthProvider>
    </Router>
  </StrictMode>
);
