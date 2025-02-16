import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { Person } from "@mui/icons-material";
import { getPartyStyle } from "../utils/style";

interface SponsorCardProps {
  people_id: number;
  party: string;
  name: string;
  role: string;
  district: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  people_id,
  party,
  name,
  role,
  district,
}) => {
  const { bgcolor, color, iconColor } = getPartyStyle(party);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      p={2}
      my={1}
      border="1px solid #ddd"
      borderRadius={2}
      sx={{ backgroundColor: "#f9f9f9" }}
    >
      {/* Person Icon with Party Color */}
      <Person fontSize="large" sx={{ color: iconColor }} />

      {/* Sponsor Info */}
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {role} - {district}
        </Typography>
      </Box>
    </Box>
  );
};

export default SponsorCard;
