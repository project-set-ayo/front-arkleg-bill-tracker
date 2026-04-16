import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Pagination,
} from "@mui/material";
import useBillInteractions from "../hooks/useBillInteractions";
import { CheckCircle, Cancel, Visibility, Archive } from "@mui/icons-material";
import { Link } from "react-router-dom";

const stanceColors: Record<string, { color: string; icon: JSX.Element }> = {
  support: { color: "success", icon: <CheckCircle color="success" /> },
  oppose: { color: "error", icon: <Cancel color="error" /> },
  watch: { color: "warning", icon: <Visibility color="warning" /> },
};

const ITEMS_PER_PAGE = 5;

interface Props {
  filterType?: "all" | "active" | "archived";
  controls?: React.ReactNode;
}

const BillInteractionsList: React.FC<Props> = ({
  filterType = "active",
  controls,
}) => {
  const allInteractions = useBillInteractions();
  const [page, setPage] = useState(1);
  const HELP_TEXT =
    "You can select bills to grade and monitor through the individual bill's detail page. From Bill Search or Tracked Keywords, click on a bill number to begin.";

  useEffect(() => {
    setPage(1);
  }, [filterType]);

  const billInteractions = allInteractions.filter((interaction) => {
    if (filterType === "active") return !interaction.is_archived;
    if (filterType === "archived") return interaction.is_archived;
    return true;
  });

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedInteractions = billInteractions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(billInteractions.length / ITEMS_PER_PAGE);

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={1} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5">Monitored Bills</Typography>
          {controls && <Box>{controls}</Box>}
        </Box>

        {billInteractions.length > 0 ? (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {HELP_TEXT}
          </Typography>
        ) : null}

        {billInteractions.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <Typography variant="body1" color="textSecondary">
              {HELP_TEXT}
            </Typography>
          </Box>
        ) : (
          <>
            <List>
              {paginatedInteractions.map((interaction) => (
                <ListItem
                  component={Link}
                  to={`/bill/${interaction.legiscan_bill_id}`}
                  key={interaction.id}
                  divider
                  sx={{
                    minHeight: 80,
                    alignItems: "center",
                    opacity: interaction.is_archived ? 0.8 : 1,
                  }}
                >
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
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        {interaction.bill_title}
                      </Typography>
                    }
                  />

                  <Box display="flex" gap={1}>
                    {interaction.is_archived && (
                      <Chip label="Archived" size="small" icon={<Archive />} />
                    )}
                    {interaction.stance && (
                      <Chip
                        label={interaction.stance.toUpperCase()}
                        color={stanceColors[interaction.stance].color as any}
                        variant="filled"
                        size={"small"}
                        sx={{ fontWeight: "bold" }}
                      />
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
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
