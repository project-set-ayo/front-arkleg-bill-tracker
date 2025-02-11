import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BillSearchList from "../../components/BillSearchList";
import TagFilterBillList from "../../components/TagFilterBillList";
import AdBanner from "../../components/AdBanner";

const BillListing: React.FC = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
        <Grid size={{ xs: 12 }}>
          <AdBanner />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h4" align="center">
              <BillSearchList />
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h4" align="center">
              <TagFilterBillList />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillListing;
