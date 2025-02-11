import { useState, useEffect } from "react";
import useAds from "../hooks/useAds";
import { Ad } from "../types/ad";
import { Paper, Box, Typography, Link } from "@mui/material";

const AdBanner = () => {
  const { ads } = useAds();
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);

  useEffect(() => {
    if (ads.length === 0) return;

    const changeAd = () => {
      const randomIndex = Math.floor(Math.random() * ads.length);
      setCurrentAd(ads[randomIndex]);
    };

    changeAd();
    const interval = setInterval(changeAd, 5000);

    return () => clearInterval(interval);
  }, [ads]);

  if (!currentAd) return null;

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Paper
        elevation={0}
        sx={{ width: "100%", maxWidth: 600, px: 2, textAlign: "center" }}
      >
        <Link href={currentAd.link} target="_blank" rel="noopener noreferrer">
          <Box
            component="img"
            src={currentAd.image}
            alt={currentAd.title}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: 300, // Prevents oversized images
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        </Link>
        <Typography variant="body1" mt={2} noWrap>
          {currentAd.title}
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdBanner;
