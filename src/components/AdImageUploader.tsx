import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, IconButton } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

const AdImageUploader: React.FC = () => {
  const { setValue, watch } = useFormContext(); // Hook into form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setValue("image", file, { shouldValidate: true }); // Add to form data

      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue("image", null, { shouldValidate: true }); // Remove from form data
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      {previewUrl ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
          <IconButton onClick={handleRemoveFile} size="small">
            <Delete color="error" />
          </IconButton>
        </Box>
      ) : (
        <IconButton component="label">
          <CloudUpload fontSize="large" />
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
        </IconButton>
      )}
    </Box>
  );
};

export default AdImageUploader;
