import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { api } from "../utils/axios";
import Cookies from "js-cookie";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout/"); // Call logout API (if backend supports it)
    } catch (error) {
      console.error("Logout failed:", error);
    }

    // Clear auth-related storage (modify if needed)
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    Cookies.remove("authToken");

    // social auth
    googleLogout();

    // Redirect to login
    navigate("/login");
  };

  return logout;
};

export default useLogout;
