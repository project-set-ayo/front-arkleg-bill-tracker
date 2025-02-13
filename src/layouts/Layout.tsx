import { Box } from "@mui/material";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <Header />

      {/* Main Content */}
      <Box
        component="main"
        sx={{ mt: 8, padding: 2, justifyContent: "center" }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
