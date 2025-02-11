import { useFormSaveState } from "../hooks/useFormSaveState";
import { Ad } from "../types/ad";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Always using Grid2
import AddIcon from "@mui/icons-material/Add";

const AdForm = ({
  addAd,
}: {
  addAd: (ad: Omit<Ad, "id" | "is_active">) => Promise<void>;
}) => {
  const {
    formState: newAd,
    handleChange,
    handleSave,
    hasChanges,
    isSaving,
  } = useFormSaveState<Omit<Ad, "id" | "is_active">>(
    { title: "", image: "", link: "", weight: 1 },
    async (data) => {
      await addAd({ ...data, weight: Number(data.weight), is_active: true });
    },
  );

  return (
    <Box sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={newAd.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={newAd.image}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Link"
            name="link"
            value={newAd.link}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Weight"
            name="weight"
            value={newAd.weight}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      {/* Save Button (Hidden if no changes) */}
      {hasChanges && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={isSaving ? <CircularProgress size={20} /> : <AddIcon />}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Add Advertisement"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AdForm;
