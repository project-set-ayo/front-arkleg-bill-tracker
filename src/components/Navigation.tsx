import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useScrollTrigger,
  CssBaseline,
} from "@mui/material";
import { Home, Person, Gavel } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/images/arkleg-mono.png";

// Elevation on scroll function
interface ElevationScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10, // Elevates after scrolling 10px
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Navigation: React.FC<ElevationScrollProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view
  const location = useLocation(); // Get current path for BottomNavigation selection

  return (
    <>
      <CssBaseline />
      {isMobile ? (
        // Bottom Navigation for Mobile
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
        // Top Navigation for Desktop with Scroll Elevation
        <ElevationScroll {...props}>
          <AppBar position="fixed" color="default">
            <Toolbar>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ width: "100%" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button component={Link} to="/" sx={{ p: 0, mr: 2 }}>
                    <img src={logo} alt="Logo" width={50} height={50} />
                  </Button>
                  <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                  >
                    Arkansas State Legislative Bill Tracker
                  </Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Button color="inherit" component={Link} to="/">
                    <Home />
                  </Button>
                  <Button color="inherit" component={Link} to="/bill">
                    <Gavel />
                  </Button>
                  <IconButton color="inherit" component={Link} to="/user">
                    <Person />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      )}
    </>
  );
};

export default Navigation;
