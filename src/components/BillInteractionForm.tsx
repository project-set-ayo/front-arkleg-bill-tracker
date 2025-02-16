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
  Switch,
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

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Ignore Bill Toggle */}
      <Box sx={{ my: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formState.ignore || false}
              onChange={(e) =>
                handleChange({
                  target: { name: "ignore", value: e.target.checked },
                } as any)
              }
              name="ignore"
            />
          }
          label="Ignore Bill"
        />
        <Typography variant="caption" color="textSecondary">
          If enabled, this bill will not be tracked for updates and will be
          excluded from keyword alerts.
        </Typography>
      </Box>

      {/* Stance Selection */}
      <FormControl>
        <FormLabel>Stance</FormLabel>
        <RadioGroup
          name="stance"
          value={formState.stance}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="support"
            control={<Radio />}
            label="Support"
          />
          <FormControlLabel value="oppose" control={<Radio />} label="Oppose" />
          <FormControlLabel value="watch" control={<Radio />} label="Watch" />
        </RadioGroup>
      </FormControl>

      {/* Note Input */}
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

      {/* Save Button */}
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
