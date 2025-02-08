import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./routes/AppRoutes";
import { RouterProvider } from "react-router";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

const googleClientId: string =
  import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID ||
  "590498199316-a1hr4d0ens62ten0m5nlf1co9e6np9pf.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  </GoogleOAuthProvider>,
);
