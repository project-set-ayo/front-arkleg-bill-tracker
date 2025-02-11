import { useState, useEffect } from "react";
import { api } from "../utils/axios"; // Ensure axios instance is properly configured
import { Ad } from "../types/ad";

const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await api.get("/ads/");
        setAds(res.data);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };

    fetchAds();
  }, []);

  return { ads };
};

export default useAds;
