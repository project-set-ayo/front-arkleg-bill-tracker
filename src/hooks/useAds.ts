import { useState, useEffect } from "react";
import { api } from "../utils/axios"; // Ensure axios instance is properly configured
import { Ad } from "../types/ad";

const useAds = (style?: "square" | "horizontal" | "vertical") => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await api.get("/ads/");
        const allAds = res.data;

        const filtered = style
          ? allAds.filter((ad: Ad) => ad.style === style)
          : allAds;

        setAds(filtered);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };

    fetchAds();
  }, [style]);

  return { ads };
};

export default useAds;
