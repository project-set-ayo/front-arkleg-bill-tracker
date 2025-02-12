import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import ClearIcon from "@mui/icons-material/Clear";
import useUserProfile from "../hooks/useUserProfile";
import { useFormSaveState } from "../hooks/useFormSaveState";
import LogoutButton from "./LogoutButton";

const UserProfileManager: React.FC = () => {
  const { user, loading, errors, setErrors, updateProfile } = useUserProfile();

  const { formState, handleChange, handleSave, hasChanges, isSaving } =
    useFormSaveState(
      { phone_number: user?.phone_number || "" },
      async (data) => {
        if (data.phone_number) {
          const formattedPhoneNumber = data.phone_number.startsWith("+")
            ? data.phone_number
            : `+${data.phone_number}`;
          await updateProfile({ phone_number: formattedPhoneNumber });
        } else {
          await updateProfile({ phone_number: "" });
        }
      },
    );

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>

      {/* Display Non-Field Errors */}
      {errors.non_field_errors && (
        <Alert severity="error">{errors.non_field_errors}</Alert>
      )}

      <TextField
        label="Email"
        value={user?.email || ""}
        fullWidth
        margin="normal"
        disabled
      />

      {/* Phone Number Input with Clear Icon */}
      <Box sx={{ position: "relative" }}>
        <PhoneInput
          country="us"
          preferredCountries={["us"]}
          onlyCountries={["us", "ca"]}
          value={formState.phone_number}
          onChange={(value) => {
            setErrors({});
            handleChange({ target: { name: "phone_number", value } } as any);
          }}
          inputStyle={{ width: "100%" }}
        />
        {formState.phone_number && (
          <InputAdornment
            position={"end"}
            sx={{ position: "absolute", top: 12, right: 10 }}
          >
            <IconButton
              size="small"
              onClick={() =>
                handleChange({
                  target: { name: "phone_number", value: "" },
                } as any)
              }
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        )}
      </Box>

      {errors.phone_number && (
        <Alert severity="error">{errors.phone_number}</Alert>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
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
