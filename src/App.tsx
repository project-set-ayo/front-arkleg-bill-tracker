import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NewsFeed from "./components/NewsFeed";
import BillInteractionsList from "./components/BillInteractionsList";
import MatchingBillsList from "./components/MatchingBillsList";
import AdBanner from "./components/AdBanner";
import useAds from "./hooks/useAds";

function App() {
  const { ads } = useAds();
  const hasAds = ads.length > 0;

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
        <Grid size={{ xs: 12, md: hasAds ? 9 : 12 }}>
          <BillInteractionsList />
        </Grid>
        {hasAds && (
          <Grid size={{ xs: 12, md: 3 }}>
            <AdBanner />
          </Grid>
        )}

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
