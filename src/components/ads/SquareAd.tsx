import { Ad } from "../../types/ad";
import { Box, Typography, Link } from "@mui/material";

const SquareAd = ({
  ad,
  displayText = false,
}: {
  ad: Ad;
  displayText?: boolean;
}) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      px: 2,
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
            height: "auto",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </Link>
      {displayText && (
        <Typography variant="body1" my={2} noWrap>
          {ad.title}
        </Typography>
      )}
    </Box>
  </Box>
);

export default SquareAd;
