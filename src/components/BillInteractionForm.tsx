import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import { useFormSaveState } from "../hooks/useFormSaveState";
import { useBillInteraction } from "../hooks/useBillInteraction";

interface BillInteractionFormProps {
  legiscanBillId: string;
}

const BillInteractionForm: React.FC<BillInteractionFormProps> = ({
  legiscanBillId,
}) => {
  // Use custom hook to handle interaction state
  const { interaction, updateInteraction, loading, error } =
    useBillInteraction(legiscanBillId);

  // Use custom hook for form management
  const { formState, handleChange, handleSave, hasChanges, isSaving } =
    useFormSaveState(interaction, updateInteraction);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your Grading
      </Typography>

      <FormControl>
        <FormLabel>Stance</FormLabel>
        <RadioGroup
          name="stance"
          value={formState.stance}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="approve"
            control={<Radio />}
            label="Approve"
          />
          <FormControlLabel value="oppose" control={<Radio />} label="Oppose" />
          <FormControlLabel value="watch" control={<Radio />} label="Watch" />
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: 3 }}>
        <FormLabel>Note</FormLabel>
        <TextField
          name="note"
          fullWidth
          multiline
          rows={4}
          value={formState.note}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {hasChanges && (
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving || loading}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BillInteractionForm;
