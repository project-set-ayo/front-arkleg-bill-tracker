import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import useLegSponsors from "../hooks/useLegSponsors";

interface Props {
  sessionId: number;
}

const SponsorList: React.FC<Props> = ({ sessionId }) => {
  const { sponsors, loading, error } = useLegSponsors(sessionId);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (sponsors.length === 0)
    return <Typography>No sponsors found for this session.</Typography>;

  return (
    <List>
      {sponsors.map((sponsor) => (
        <ListItem key={sponsor.people_id} divider>
          <ListItemText primary={sponsor.name} secondary={sponsor.party} />
        </ListItem>
      ))}
    </List>
  );
};

export default SponsorList;
