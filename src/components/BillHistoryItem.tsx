import React from "react";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { History as HistoryIcon } from "@mui/icons-material";

interface BillHistoryItemProps {
  date: string;
  action: string;
  chamber: string;
  chamber_id: number;
  importance: number;
}

const BillHistoryItem: React.FC<BillHistoryItemProps> = ({
  date,
  action,
  chamber,
  chamber_id,
  importance,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      p={2}
      my={1}
      border="1px solid #ddd"
      borderRadius={2}
      sx={{
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box flex={1}>
        <Tooltip title={action} arrow>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // Limit to 2 lines
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {action}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="textSecondary">
          {date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Chamber: {chamber === "S" ? "Senate" : "House"}
        </Typography>
      </Box>
    </Box>
  );
};

export default BillHistoryItem;
