import { useCallback } from "react";
import useAdminAds from "../hooks/useAdminAds";
import { Box, Typography } from "@mui/material";
import AdForm from "./AdForm";
import AdList from "./AdList";

const AdminAdManager = () => {
  const { adminAds, addAd, updateAd, deleteAd, loading } = useAdminAds();

  // Memoized handlers to prevent unnecessary re-renders
  const updateAdHandler = useCallback(
    async (id: number, weight: number) => {
      await updateAd(id, { weight });
    },
    [updateAd],
  );

  const deleteAdHandler = useCallback(
    async (id: number) => {
      await deleteAd(id);
    },
    [deleteAd],
  );

  return (
    <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Manage Ads
      </Typography>

      {/* Ad Form Component */}
      <AdForm addAd={addAd} />

      {/* Ad List Component */}
      {loading ? (
        <Typography align="center">Loading Ads...</Typography>
      ) : (
        <AdList
          adminAds={adminAds}
          updateAdHandler={updateAdHandler}
          deleteAdHandler={deleteAdHandler}
        />
      )}
    </Box>
  );
};

export default AdminAdManager;
