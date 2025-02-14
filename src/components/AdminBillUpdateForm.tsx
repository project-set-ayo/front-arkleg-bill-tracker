import React from "react";
import { useAdminBill } from "../hooks/useAdminBill";
import { useTimedMessage } from "../hooks/useTimedMessage";
import { useFormSaveState } from "../hooks/useFormSaveState";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";

interface ChildProps {
  billId: string;
}

const AdminBillUpdateForm: React.FC<ChildProps> = ({ billId }) => {
  const COMPONENT_LABEL = "Administrator's Grading";
  const ACTION_LABEL = "Update Admin. Grading";

  const { updateBill, loading, error, bill } = useAdminBill(billId);
  const { message, showMessage } = useTimedMessage(3000);

  // Using useFormSaveState for handling form state
  const { formState, handleChange, handleSave, hasChanges, isSaving } =
    useFormSaveState(
      {
        admin_note: bill?.admin_note || "",
        admin_stance: bill?.admin_stance || "",
        admin_expanded_analysis_url: bill?.admin_expanded_analysis_url || "",
        tag_names: bill?.tags?.join(", ") || "",
      },
      async (updatedData) => {
        const updateData = {
          ...updatedData,
          legiscan_bill_id: billId,
          tag_names: updatedData.tag_names
            ? updatedData.tag_names.split(",").map((tag) => tag.trim())
            : [], // Convert tags to an array
        };
        const result = await updateBill(updateData);
        if (result) {
          showMessage("Bill updated successfully!", "success");
        } else {
          showMessage("Failed to update bill.", "error");
        }
      },
    );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {COMPONENT_LABEL}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity={message.type}>{message.text}</Alert>}

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Admin Stance Radio Buttons */}
        <Box sx={{ m: 1 }}>
          <FormControl component="fieldset">
            <RadioGroup
              name="admin_stance"
              value={formState.admin_stance}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="support"
                control={<Radio />}
                label="Support"
              />
              <FormControlLabel
                value="oppose"
                control={<Radio />}
                label="Oppose"
              />
              <FormControlLabel
                value="watch"
                control={<Radio />}
                label="Watch"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Admin Note */}
        <TextField
          label="Admin Note"
          name="admin_note"
          multiline
          rows={3}
          value={formState.admin_note}
          onChange={handleChange}
          fullWidth
        />

        {/* Expanded Analysis URL */}
        <TextField
          label="Expanded Analysis URL"
          name="admin_expanded_analysis_url"
          value={formState.admin_expanded_analysis_url}
          onChange={handleChange}
          fullWidth
        />

        {/* Tags */}
        <TextField
          label="Tags (comma-separated)"
          name="tag_names"
          value={formState.tag_names}
          onChange={handleChange}
          fullWidth
        />

        {/* Save Button - Only Shows When There Are Changes */}
        {hasChanges && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSaving || loading}
            sx={{ mt: 2 }}
          >
            {isSaving ? <CircularProgress size={24} /> : ACTION_LABEL}
          </Button>
        )}
      </Box>
    </>
  );
};

export default AdminBillUpdateForm;
