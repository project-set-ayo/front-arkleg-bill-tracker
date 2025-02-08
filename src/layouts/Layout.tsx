import { Box } from "@mui/material";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Cookies from "js-cookie";

const Layout = () => {
  const location = useLocation();
  const token = Cookies.get("authToken");

  if (!token) {
    // Redirect to sign-in with the current path as a callback URL
    const redirectTo = `/login?callbackUrl=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <Box>
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <Box component="main" sx={{ padding: 2, justifyContent: "center" }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
