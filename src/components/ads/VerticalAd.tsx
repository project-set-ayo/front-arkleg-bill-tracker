import { Ad } from "../../types/ad";
import { Box, Link, Typography } from "@mui/material";

const VerticalAd = ({
  ad,
  displayText = false,
}: {
  ad: Ad;
  displayText?: boolean;
}) => (
  <Box
    sx={{
      height: "100%",
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
            height: "100%",
            maxWidth: "100%",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </Link>
      {displayText && (
        <Typography variant="caption" mt={1} textAlign="center" noWrap>
          {ad.title}
        </Typography>
      )}
    </Box>
  </Box>
);

export default VerticalAd;
