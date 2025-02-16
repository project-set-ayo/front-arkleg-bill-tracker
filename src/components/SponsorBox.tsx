import { Box, Chip, Typography } from "@mui/material";
import { Sponsor } from "../types/sponsor";

interface SponsorCardProps {
  sponsor: Sponsor;
  isSelected?: boolean;
  onClick?: () => void;
}

const getPartyStyle = (party: string) => {
  switch (party) {
    case "R":
      return { bgcolor: "#d92323", color: "white" }; // Republican Red
    case "D":
      return { bgcolor: "#1870f2", color: "white" }; // Democrat Blue
    default:
      return { bgcolor: "#808080", color: "white" }; // Neutral Gray for others
  }
};

const SponsorBox: React.FC<SponsorCardProps> = ({
  sponsor,
  isSelected = false,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default",
        gap: 1,
        p: 1,
        borderRadius: 1,
        transition: "background-color 0.2s ease-in-out",
        backgroundColor: isSelected ? "lightgray" : "",
      }}
    >
      <Chip
        size="small"
        label={
          <Typography
            variant="caption"
            sx={{ fontSize: "0.7rem", fontWeight: "bold" }}
          >
            {sponsor.role}
          </Typography>
        }
        sx={{
          height: 16,
          px: 1,
          ...getPartyStyle(sponsor.party),
        }}
      />
      <Typography variant="body1" fontWeight={isSelected ? "bold" : "normal"}>
        {sponsor.name}
      </Typography>
    </Box>
  );
};

export default SponsorBox;
