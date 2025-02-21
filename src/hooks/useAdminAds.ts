import { useState, useEffect, useCallback } from "react";
import { api } from "../utils/axios";
import { Ad } from "../types/ad";

const useAdminAds = () => {
  const [adminAds, setAdminAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAdminAds = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/ads/admin-view/");
      setAdminAds(res.data);
    } catch (err) {
      console.error("Error fetching admin ads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminAds();
  }, [fetchAdminAds]);

  const addAd = async (newAd: Ad) => {
    try {
      const res = await api.post("/ads/", newAd, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ Ensure correct headers
      });
      setAdminAds((prevAds) => [res.data, ...prevAds]);
      return { success: true }; // Indicate success
    } catch (err: any) {
      if (err.response?.data) {
        return { success: false, errors: err.response.data }; // Return backend errors
      }
      return { success: false, errors: { general: "Failed to create ad" } };
    }
  };

  // Update state directly instead of re-fetching
  const updateAd = async (id: number, updatedAd: Partial<Ad>) => {
    try {
      await api.patch(`/ads/${id}/`, updatedAd);
      setAdminAds((prevAds) =>
        prevAds.map((ad) => (ad.id === id ? { ...ad, ...updatedAd } : ad)),
      ); // Only update the changed ad in state
    } catch (err) {
      console.error("Error updating ad:", err);
    }
  };

  const deleteAd = async (id: number) => {
    try {
      await api.delete(`/ads/${id}/`);
      setAdminAds((prevAds) => prevAds.filter((ad) => ad.id !== id)); // Only remove from state
    } catch (err) {
      console.error("Error deleting ad:", err);
    }
  };

  return { adminAds, fetchAdminAds, addAd, updateAd, deleteAd, loading };
};

export default useAdminAds;
