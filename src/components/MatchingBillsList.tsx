import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useMatchingBills from "../hooks/useMatchingBills";

const ITEMS_PER_PAGE = 7; // ✅ Controls number of bills per page

const MatchingBillsList: React.FC = () => {
  const {
    bills,
    filteredBills,
    selectedKeyword,
    setSelectedKeyword,
    loading,
    error,
  } = useMatchingBills();

  const [page, setPage] = useState(1); // ✅ Track pagination state

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const keywords = Object.keys(bills);

  // ✅ Pagination Logic
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedBills = filteredBills.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredBills.length / ITEMS_PER_PAGE);

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={1} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Matching Bills
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          Save the keywords you want to track on your profile page.
        </Typography>

        {/* Keyword Filter Dropdown */}
        <Select
          value={selectedKeyword || ""}
          onChange={(e) => setSelectedKeyword(e.target.value || null)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">All Keywords</MenuItem>
          {keywords.map((keyword) => (
            <MenuItem key={keyword} value={keyword}>
              {keyword}
            </MenuItem>
          ))}
        </Select>

        {/* List of Matching Bills */}
        <List>
          {paginatedBills.map((bill) => (
            <ListItem
              component={RouterLink}
              to={`bill/${bill.bill_id}`}
              key={bill.bill_id}
              divider
              sx={{
                minHeight: 80,
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {bill.bill_number}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    {bill.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MatchingBillsList;
