import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NewsFeed from "./components/NewsFeed";
import BillInteractionsList from "./components/BillInteractionsList";
import MatchingBillsList from "./components/MatchingBillsList";

function App() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 9 }}>
          <BillInteractionsList />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h5" align="center">
              Ads
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <NewsFeed />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <MatchingBillsList />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
