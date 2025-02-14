import { useState } from "react";
import { List, ListItem, Typography, TextField, Box } from "@mui/material";
import useBills from "../hooks/useBills";
import { Link } from "react-router-dom";

const SessionBillList = ({ sessionId }: { sessionId: number }) => {
  const { bills, loading, error } = useBills(sessionId);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter bills based on search input
  const filteredBills = bills.filter((bill) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // No filtering if searchQuery is empty

    return (
      bill.number.toLowerCase().includes(query) || // Match bill number (e.g., "HB123")
      (query === "hb" && bill.number.startsWith("HB")) || // House Bills
      (query === "sb" && bill.number.startsWith("SB")) || // Senate Bills
      (query === "hr" && bill.number.startsWith("HR")) || // House Resolutions
      (query === "sr" && bill.number.startsWith("SR")) || // Senate Resolutions
      (query === "sjr" && bill.number.startsWith("SJR")) // Senate Joint Resolutions
    );
  });

  return (
    <Box>
      {/* Search Input */}
      <TextField
        fullWidth
        label="Filter Bills (e.g by Number: SR1..., Chamber: H/S, and Type: B/R/JR)"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display Filtered Bills */}
      <List>
        {filteredBills.map((bill) => (
          <ListItem
            key={bill.bill_id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Link to={`/bill/${bill.bill_id}`} target="_blank">
              <Typography fontWeight="bold">{bill.number}</Typography>
              <Typography variant="body2" color="textSecondary">
                {bill.title}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SessionBillList;
