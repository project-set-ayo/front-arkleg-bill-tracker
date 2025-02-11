import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserProfileManager from "../components/UserProfileManager";
import UserKeywordManager from "../components/UserKeywordManager";
import AdBanner from "../components/AdBanner";
import AdminAdManager from "../components/AdminAdManager";
import useUserProfile from "../hooks/useUserProfile";

const UserSettings: React.FC = () => {
  const { isAdmin } = useUserProfile();

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Grid container spacing={2} size={{ xs: 12 }}>
        <Grid container size={{ xs: 12, md: 8 }}>
          <Grid size={{ xs: 12 }}>
            <UserProfileManager />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <UserKeywordManager />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AdBanner />
        </Grid>
        {isAdmin ? (
          <Grid size={{ xs: 12, md: 12 }}>
            <AdminAdManager />
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default UserSettings;
