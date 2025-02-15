import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useScrollTrigger,
  CssBaseline,
} from "@mui/material";
import { Home, Person, Gavel } from "@mui/icons-material";
import TagIcon from "@mui/icons-material/Label";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/images/arkleg-mono.png";
import useUserProfile from "../hooks/useUserProfile"; // Import the user profile hook

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
  const { user } = useUserProfile(); // Get user profile

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
            label="Home"
            icon={<Home />}
            component={Link}
            to="/"
            value="/"
          />
          <BottomNavigationAction
            label="Bills"
            icon={<Gavel />}
            component={Link}
            to="/bill"
            value="/bill"
          />
          <BottomNavigationAction
            label="Tags"
            icon={<TagIcon />}
            component={Link}
            to="/tag"
            value="/tag"
          />
          <BottomNavigationAction
            label={user?.full_name}
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                {/* Logo and Title */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button component={Link} to="/" sx={{ p: 1, mr: 2 }}>
                    <img src={logo} alt="Logo" width={100} height={"auto"} />
                  </Button>
                  <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                  >
                    Arkansas State Legislative Bill Tracker
                  </Typography>
                </Box>

                {/* Navigation and User Info */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button color="inherit" component={Link} to="/">
                    <Home />
                  </Button>
                  <Button color="inherit" component={Link} to="/bill">
                    <Gavel />
                  </Button>
                  <Button color="inherit" component={Link} to="/tag">
                    <TagIcon />
                  </Button>

                  {/* User Icon */}
                  <Button
                    component={Link}
                    to="/user"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      textTransform: "none",
                      color: "inherit",
                      borderRadius: 2,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Person />
                    {user?.full_name && (
                      <Typography variant="body1" fontWeight="bold">
                        {user.full_name}
                      </Typography>
                    )}
                  </Button>
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
