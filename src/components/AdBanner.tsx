import { useState, useEffect } from "react";
import useAds from "../hooks/useAds";
import { Ad } from "../types/ad";

import SquareAd from "./ads/SquareAd";
import HorizontalAd from "./ads/HorizontalAd";
import VerticalAd from "./ads/VerticalAd";

type Style = "square" | "horizontal" | "vertical";

const AdBanner = ({ style }: { style: Style }) => {
  const { ads } = useAds(style);
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);

  useEffect(() => {
    if (!ads.length) return;

    const changeAd = () => {
      const randomIndex = Math.floor(Math.random() * ads.length);
      setCurrentAd(ads[randomIndex]);
    };

    changeAd();
    const interval = setInterval(changeAd, 5000);
    return () => clearInterval(interval);
  }, [ads]);

  if (!currentAd) return null;

  const commonProps = {
    ad: currentAd,
  };

  switch (currentAd.style) {
    case "horizontal":
      return <HorizontalAd {...commonProps} />;
    case "vertical":
      return <VerticalAd {...commonProps} />;
    default:
      return <SquareAd {...commonProps} />;
  }
};

export default AdBanner;
