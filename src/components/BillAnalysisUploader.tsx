import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { CloudUpload, Delete, Description } from "@mui/icons-material";
import useBillAnalysis from "../hooks/useBillAnalysis";

interface BillAnalysisUploaderProps {
  billId: string;
}

const BillAnalysisUploader: React.FC<BillAnalysisUploaderProps> = ({
  billId,
}) => {
  const {
    analyses,
    loading,
    error,
    fetchAnalyses,
    uploadAnalysis,
    deleteAnalysis,
  } = useBillAnalysis(billId);

  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchAnalyses();
  }, [billId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file && description.trim()) {
      uploadAnalysis(file, description);
      setFile(null);
      setDescription("");
    }
  };

  return (
    <Box sx={{}}>
      <Typography variant="h6">Analysis Documents</Typography>

      {/* General Errors */}
      {error.general && <Alert severity="error">{error.general}</Alert>}

      {/* File-Specific Errors */}
      {error.file && <Alert severity="error">{error.file}</Alert>}

      <Box display="flex" gap={2} my={2} alignItems={"center"}>
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          size="small"
          error={Boolean(error.description)}
          helperText={error.description}
        />

        <IconButton component="label">
          <CloudUpload fontSize="large" />
          <input type="file" hidden onChange={handleFileChange} />
        </IconButton>
      </Box>

      {/* File Selection */}
      {file && (
        <Typography variant="body2" color="textSecondary">
          Selected File: {file.name}
        </Typography>
      )}

      {/* Upload Button */}
      {file && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || !description || loading}
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      )}

      {/* List Uploaded Files */}
      <List sx={{ mt: 2 }}>
        {analyses
          .sort(
            (a, b) =>
              new Date(b.uploaded_at).getTime() -
              new Date(a.uploaded_at).getTime(),
          )
          .map((analysis) => (
            <ListItem
              key={analysis.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 1,
                my: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Description color="primary" />
                <Typography variant="body2">{analysis.description}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  href={analysis.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  View
                </Button>
                <IconButton
                  onClick={() => deleteAnalysis(analysis.id)}
                  size="small"
                >
                  <Delete color="error" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default BillAnalysisUploader;
