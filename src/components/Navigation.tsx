import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import { Home, Person, Gavel } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navigation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Detect mobile view
  const location = useLocation(); // ✅ Get current path for BottomNavigation selection

  return isMobile ? (
    // ✅ Bottom Navigation for Mobile
    <BottomNavigation
      showLabels
      value={location.pathname}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <BottomNavigationAction
        label="Bills"
        icon={<Gavel />}
        component={Link}
        to="/bill"
        value="/bill"
      />
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={Link}
        to="/"
        value="/"
      />
      <BottomNavigationAction
        label="User"
        icon={<Person />}
        component={Link}
        to="/user"
        value="/user"
      />
    </BottomNavigation>
  ) : (
    // ✅ Top Navigation for Desktop
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Arkansas State Legislative Bill Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/">
          <Home />
        </Button>
        <Button color="inherit" component={Link} to="/bill">
          <Gavel />
        </Button>
        <IconButton color="inherit" component={Link} to="/user">
          <Person />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
