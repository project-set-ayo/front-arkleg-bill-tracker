import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserProfileManager from "../components/UserProfileManager";
import UserKeywordManager from "../components/UserKeywordManager";

const UserSettings: React.FC = () => {
  return (
    <Box sx={{ p: 3, width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid container spacing={2} size={{ xs: 12 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserProfileManager />
          <UserKeywordManager />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h5" align="center">
              Ads
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserSettings;
