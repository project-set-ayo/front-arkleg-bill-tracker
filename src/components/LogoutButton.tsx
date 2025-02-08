import React from "react";
import { Button } from "@mui/material";
import useLogout from "../hooks/useLogout";

const LogoutButton: React.FC = () => {
  const logout = useLogout();

  return (
    <Button variant="contained" color="error" onClick={logout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
