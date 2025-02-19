import { useState } from "react";
import {
  List,
  Box,
  ListItem,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import useLegSponsors from "../hooks/useLegSponsors";
import SponsorBillList from "./SponsorBillList";
import SponsorBox from "./SponsorBox";
import { Sponsor } from "../types/sponsor";
import { sortByKey } from "../utils/hof";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

const SessionSponsorList = ({ sessionId }: { sessionId: number }) => {
  const { sponsors, loading, error } = useLegSponsors(sessionId);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const sortSponsorsByNameAsc = sortByKey<Sponsor>("name", "asc");

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  // Filter sponsors based on search query (case insensitive)
  const filteredSponsors = sortSponsorsByNameAsc(sponsors).filter((sponsor) =>
    sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isMobile) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Mobile Layout */}
        <Box width={"100%"}>
          {/* Autocomplete Dropdown */}
          <Autocomplete
            options={filteredSponsors}
            getOptionLabel={(option) => option.name}
            onChange={(_, newValue) => setSelectedSponsor(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Sponsor"
                variant="outlined"
              />
            )}
            sx={{ my: 1 }}
          />
        </Box>

        {/* Sponsored Bills */}
        {selectedSponsor && (
          <Box width={"100%"}>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              Bills sponsored by {selectedSponsor.name}
            </Typography>

            <SponsorBillList
              sessionId={sessionId}
              peopleId={selectedSponsor.people_id}
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ height: "100vh", overflow: "auto" }}>
      {/* Desktop Layout */}
      <Grid size={{ xs: 12, sm: 5 }}>
        {/* Search Input */}
        <TextField
          fullWidth
          label="Search Sponsors"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ my: 1 }}
        />

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <List>
          {filteredSponsors.map((sponsor) => (
            <ListItem key={sponsor.people_id} sx={{ p: 0, py: 1 }}>
              <SponsorBox
                sponsor={sponsor}
                isSelected={selectedSponsor?.people_id === sponsor.people_id}
                onClick={() => setSelectedSponsor(sponsor)}
              />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Sponsored Bills */}
      {selectedSponsor && (
        <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={"bold"}>
            Bills sponsored by {selectedSponsor.name}
          </Typography>

          <SponsorBillList
            sessionId={sessionId}
            peopleId={selectedSponsor.people_id}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default SessionSponsorList;
