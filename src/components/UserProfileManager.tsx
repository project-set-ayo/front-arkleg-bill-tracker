import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import useUserProfile from "../hooks/useUserProfile";
import LogoutButton from "./LogoutButton";
import { useFormSaveState } from "../hooks/useFormSaveState";

const UserProfileManager: React.FC = () => {
  const { user, loading, error, updateProfile } = useUserProfile();

  // Use the fixed custom hook for handling form state
  const { formState, handleChange, handleSave, hasChanges, isSaving } =
    useFormSaveState(
      { phone_number: user?.phone_number || "" },
      async (data) => {
        await updateProfile({ phone_number: data.phone_number });
      },
    );

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
        name="phone_number" // Ensure the name matches the formState key
        value={formState.phone_number}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <LogoutButton />
        {hasChanges && (
          <Button variant="contained" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserProfileManager;
