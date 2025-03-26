import { Ad } from "../../types/ad";
import { Box, Link, Typography } from "@mui/material";

const HorizontalAd = ({
  ad,
  displayText = false,
}: {
  ad: Ad;
  displayText?: boolean;
}) => (
  <Box
    display="flex"
    alignItems="center"
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      px: 2,
      textAlign: "center",
    }}
  >
    <Box sx={{ textAlign: "center" }}>
      <Link href={ad.link} target="_blank" rel="noopener noreferrer">
        <Box
          component="img"
          src={ad.image}
          alt={ad.title}
          sx={{
            width: "100%",
            height: 120,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </Link>
      {displayText && (
        <Typography variant="body2" my={2} noWrap>
          {ad.title}
        </Typography>
      )}
    </Box>
  </Box>
);

export default HorizontalAd;
