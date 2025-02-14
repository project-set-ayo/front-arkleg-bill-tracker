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
      // single-letter
      (query === "hb" && bill.number.startsWith("HB")) || // House Bills
      (query === "sb" && bill.number.startsWith("SB")) || // Senate Bills
      (query === "hr" && bill.number.startsWith("HR")) || // House Resolutions
      (query === "sr" && bill.number.startsWith("SR")) || // Senate Resolutions
      (query === "hjr" && bill.number.startsWith("HJR")) || // House Joint Resolutions
      (query === "sjr" && bill.number.startsWith("SJR")) || // Senate Joint Resolutions
      // full-word
      // chamber
      (query === "house" && bill.number.includes("H")) || // House
      (query === "senate" && bill.number.includes("S")) || // Senate
      // type
      (query === "bill" && bill.number.includes("B")) || // Bills
      (query === "resolution" && bill.number.includes("R")) || // Resolutions
      ((query === "joint resolution" || query === "joint") &&
        bill.number.includes("JR")) || // Joint Resolutions
      // compound: chamber-type
      (query === "house bill" && bill.number.startsWith("HB")) || // House Bills
      (query === "senate bill" && bill.number.startsWith("SB")) || // Senate Bills
      (query === "house resolution" && bill.number.startsWith("HR")) || // House Resolutions
      (query === "senate resolution" && bill.number.startsWith("SR")) || // Senate Resolutions
      (query === "house joint resolution" && bill.number.startsWith("HJR")) || // House Joint Resolutions
      (query === "senate joint resolution" && bill.number.startsWith("SJR")) // Senate Joint Resolutions
    );
  });

  return (
    <Box>
      {/* Search Input */}
      <TextField
        fullWidth
        label="Filter bills by bill number, chamber (House/Senate) or type (bill/resolution/joint resolution)"
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
