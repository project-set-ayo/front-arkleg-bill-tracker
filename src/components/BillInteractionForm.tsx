import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";

interface BillInteractionFormProps {
  userInfo: any;
  updateInteraction: (
    stance: "approve" | "oppose" | "watch",
    note: string
  ) => Promise<void>;
}

const BillInteractionForm: React.FC<BillInteractionFormProps> = ({
  userInfo,
  updateInteraction,
}) => {
  const [formData, setFormData] = useState({
    stance: userInfo?.stance || "",
    note: userInfo?.note || "",
  });

  // Sync with latest userInfo data
  useEffect(() => {
    setFormData({
      stance: userInfo?.stance || "",
      note: userInfo?.note || "",
    });
  }, [userInfo]);

  const handleSave = async () => {
    await updateInteraction(
      formData.stance as "approve" | "oppose" | "watch",
      formData.note
    );
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* Stance Selection */}
      <FormControl>
        <FormLabel>Stance</FormLabel>
        <RadioGroup
          value={formData.stance}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              stance: e.target.value as "approve" | "oppose" | "watch",
            }))
          }
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

      {/* Note Input */}
      <Box sx={{ mt: 3 }}>
        <FormLabel>Note</FormLabel>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={formData.note}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, note: e.target.value }))
          }
          variant="outlined"
        />
      </Box>

      {/* Save Button */}
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default BillInteractionForm;
