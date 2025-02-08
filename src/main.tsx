import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./routes/AppRoutes";
import { RouterProvider } from "react-router";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

const googleClientId: string = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
