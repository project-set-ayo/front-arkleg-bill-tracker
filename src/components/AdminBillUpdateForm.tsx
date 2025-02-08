import React, { useState, useEffect } from "react";
import { useAdminBill } from "../hooks/useAdminBill";
import { useTimedMessage } from "../hooks/useTimedMessage";
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
  const COMPONENT_LABEL = "Admin Info";
  const ACTION_LABEL = "Update Admin Info";

  const { updateBill, loading, error, bill } = useAdminBill(billId);
  const { message, showMessage } = useTimedMessage(3000);

  // Single object to manage form state
  const [formData, setFormData] = useState({
    admin_note: "",
    admin_stance: "",
    admin_expanded_analysis_url: "",
    tag_names: "",
  });

  // First load state to prevent showing messages on initial load
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (bill) {
      setFormData({
        admin_note: bill.admin_note || "",
        admin_stance: bill.admin_stance || "",
        admin_expanded_analysis_url: bill.admin_expanded_analysis_url || "",
        tag_names: bill.tags?.join(", ") || "",
      });

      setFirstLoad(false);
    }
  }, [bill]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, admin_stance: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      ...formData,
      legiscan_bill_id: billId,
      tag_names: formData.tag_names.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to array
    };

    if (billId) {
      const result = await updateBill(updateData);
      if (result) {
        showMessage("Bill updated successfully!", "success");
      } else {
        showMessage("Failed to update bill.", "error");
      }
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {COMPONENT_LABEL}
      </Typography>

      {error && !firstLoad && <Alert severity="error">{error}</Alert>}
      {message && !firstLoad && (
        <Alert severity={message.type}>{message.text}</Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Admin Stance Radio Buttons */}
        <Box sx={{ m: 1 }}>
          <FormControl component="fieldset">
            <RadioGroup
              name="admin_stance"
              value={formData.admin_stance}
              onChange={handleStanceChange}
              row
            >
              <FormControlLabel
                value="approve"
                control={<Radio />}
                label="Approve"
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
          value={formData.admin_note}
          onChange={handleChange}
          fullWidth
        />

        {/* Expanded Analysis URL */}
        <TextField
          label="Expanded Analysis URL"
          name="admin_expanded_analysis_url"
          value={formData.admin_expanded_analysis_url}
          onChange={handleChange}
          fullWidth
        />

        {/* Tags */}
        <TextField
          label="Tags (comma-separated)"
          name="tag_names"
          value={formData.tag_names}
          onChange={handleChange}
          fullWidth
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : ACTION_LABEL}
        </Button>
      </Box>
    </>
  );
};

export default AdminBillUpdateForm;
