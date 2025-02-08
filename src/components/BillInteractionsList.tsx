import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Pagination,
} from "@mui/material";
import useBillInteractions from "../hooks/useBillInteractions";
import {
  CheckCircle,
  Cancel,
  Visibility,
  InfoOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Define colors and icons for each stance
const stanceColors: Record<string, { color: string; icon: JSX.Element }> = {
  approve: { color: "success", icon: <CheckCircle color="success" /> },
  oppose: { color: "error", icon: <Cancel color="error" /> },
  watch: { color: "warning", icon: <Visibility color="warning" /> },
};

const ITEMS_PER_PAGE = 5; // ✅ Controls number of interactions per page

const BillInteractionsList: React.FC = () => {
  const billInteractions = useBillInteractions();
  const [page, setPage] = useState(1);

  // ✅ Pagination Logic
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedInteractions = billInteractions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(billInteractions.length / ITEMS_PER_PAGE);

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={1} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Monitored Bills
        </Typography>

        {billInteractions.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <InfoOutlined sx={{ fontSize: 48, color: "grey.500" }} />
            <Typography variant="body1" color="textSecondary">
              No bill interactions yet. Engage with bills to track them here.
            </Typography>
          </Box>
        ) : (
          <>
            <List>
              {paginatedInteractions.map((interaction) => (
                <ListItem
                  component={Link}
                  to={`bill/${interaction.legiscan_bill_id}`}
                  key={interaction.id}
                  divider
                  sx={{
                    minHeight: 80, // ✅ Ensures each item has a fixed height
                    alignItems: "center",
                  }}
                >
                  {/* Stance Avatar */}
                  {/* 
                  <Avatar
                    sx={{
                      bgcolor: stanceColors[interaction.stance].color,
                      mr: 2,
                    }}
                  >
                    {stanceColors[interaction.stance].icon}
                  </Avatar>
                  */}

                  {/* Bill Information */}
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {interaction.bill_number}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2, // Limits bill title to n lines
                          overflow: "hidden",
                        }}
                      >
                        {interaction.bill_title}
                      </Typography>
                    }
                  />

                  {/* Stance Indicator */}
                  {interaction.stance && (
                    <Chip
                      label={interaction.stance.toUpperCase()}
                      color={stanceColors[interaction.stance].color as any}
                      variant="filled"
                      size={"small"}
                      sx={{ fontWeight: "bold" }}
                    />
                  )}
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
          </>
        )}
      </Paper>
    </Box>
  );
};

export default BillInteractionsList;
