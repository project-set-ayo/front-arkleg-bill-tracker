import React from "react";
import { Paper, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserProfileManager from "../../components/UserProfileManager";
import UserKeywordManager from "../../components/UserKeywordManager";
import AdBanner from "../../components/AdBanner";
import AdminAdManager from "../../components/AdminAdManager";
import useUserProfile from "../../hooks/useUserProfile";
import useAds from "../../hooks/useAds";

const UserSettings: React.FC = () => {
  const AD_STYLE = "vertical";
  const { ads } = useAds(AD_STYLE);
  const { isAdmin } = useUserProfile();
  const hasAds = ads.length > 0;

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Grid container spacing={2} size={{ xs: 12 }}>
        <Grid container size={{ xs: 12, md: hasAds ? 8 : 12 }}>
          <Grid size={{ xs: 12 }}>
            <Paper elevation={1} sx={{ borderRadius: 3 }}>
              <UserProfileManager />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Paper elevation={1} sx={{ borderRadius: 3 }}>
              <UserKeywordManager />
            </Paper>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AdBanner style={AD_STYLE} />
        </Grid>

        {isAdmin ? (
          <Grid size={{ xs: 12, md: 12 }}>
            <Paper elevation={1} sx={{ borderRadius: 3 }}>
              <AdminAdManager />
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default UserSettings;
