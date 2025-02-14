import { useState } from "react";
import { List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useLegSponsors from "../hooks/useLegSponsors";
import SponsorBillList from "./SponsorBillList";
import SponsorBox from "./SponsorBox";
import { Sponsor } from "../types/sponsor";
import { sortByKey } from "../utils/hof";

const SessionSponsorList = ({ sessionId }: { sessionId: number }) => {
  const { sponsors, loading, error } = useLegSponsors(sessionId);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const sortSponsorsByNameAsc = sortByKey<Sponsor>("name", "asc");

  return (
    <Grid container spacing={2} sx={{ height: "100vh", overflow: "auto" }}>
      {/* Sponsor List */}
      <Grid size={{ xs: 12, sm: 5 }}>
        <Typography variant="h6" fontWeight={"bold"}>
          Sponsors
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <List>
          {sortSponsorsByNameAsc(sponsors).map((sponsor) => (
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
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="h6" fontWeight={"bold"}>
          Sponsored Bills
        </Typography>

        {selectedSponsor && (
          <SponsorBillList peopleId={selectedSponsor.people_id} />
        )}
      </Grid>
    </Grid>
  );
};

export default SessionSponsorList;
