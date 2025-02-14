import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import useLegSessions from "../hooks/useLegSessions";
import { Session } from "../types/session";

interface Props {
  onSelectSession: (session: Session) => void;
  selectedSessionId: number | null;
}

const LegSessionList: React.FC<Props> = ({
  onSelectSession,
  selectedSessionId,
}) => {
  const { sessions, loading, error } = useLegSessions();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSessions = sessions.filter((session) =>
    `${session.session_name} ${session.session_title}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Search Sessions"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List>
        {filteredSessions.map((session) => (
          <ListItem
            key={session.session_id}
            button
            selected={session.session_id === selectedSessionId}
            onClick={() => onSelectSession(session)}
            sx={{
              bgcolor:
                session.session_id === selectedSessionId
                  ? "primary.light"
                  : "inherit",
            }}
          >
            <ListItemText
              primary={session.session_title}
              secondary={`Year: ${session.year_start} - ${session.year_end}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LegSessionList;
