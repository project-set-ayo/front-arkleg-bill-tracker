import { useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import useLegSessions from "../hooks/useLegSessions";
import { Session } from "../types/session";

interface Props {
  onSelect: (session: Session) => void;
  selectedSession: Session | null;
}

const SessionList = ({ onSelect, selectedSession }: Props) => {
  const { sessions, loading, error } = useLegSessions();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box
      sx={{
        maxHeight: selectedSession ? "120px" : "80vh",
        overflow: "auto",
        transition: "max-height 0.3s",
      }}
    >
      {/* Autocomplete Input for Searching & Selecting Sessions */}
      <Autocomplete
        options={sessions}
        getOptionLabel={(option) => option.session_title}
        value={selectedSession}
        onChange={(_, newValue) => {
          if (newValue) {
            onSelect(newValue);
          }
        }}
        inputValue={searchQuery}
        onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Sessions"
            variant="outlined"
            sx={{ mt: 1, p: 1 }}
          />
        )}
        isOptionEqualToValue={(option, value) =>
          option.session_id === value.session_id
        } // Ensure proper selection
        getOptionKey={(option) => option.session_id.toString()} // Ensure unique key
      />

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default SessionList;
