import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import useUserProfile from "../hooks/useUserProfile";
import LogoutButton from "./LogoutButton";

const UserProfileManager: React.FC = () => {
  const { user, loading, error, updateProfile } = useUserProfile();
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || "");

  useEffect(() => {
    if (user?.phone_number) {
      setPhoneNumber(user.phone_number);
    }
  }, [user]);

  const handleSave = async () => {
    await updateProfile({ phone_number: phoneNumber });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="Email"
        value={user?.email || ""}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        xs={{ p: 2 }}
      >
        <LogoutButton />
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfileManager;
