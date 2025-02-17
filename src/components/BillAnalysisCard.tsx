import React from "react";
import { Box, Typography } from "@mui/material";
import PdfViewer from "./PdfViewer";

interface BillAnalysisCardProps {
  file: string;
  description: string;
  uploaded_at: string;
}

const BillAnalysisCard: React.FC<BillAnalysisCardProps> = ({
  file,
  description,
  uploaded_at,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      my={1}
      border="1px solid #ddd"
      borderRadius={2}
      sx={{ backgroundColor: "#f9f9f9" }}
    >
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(uploaded_at).toLocaleDateString()}
        </Typography>
      </Box>
      <PdfViewer pdfUrl={file} label="View Analysis" />
    </Box>
  );
};

export default BillAnalysisCard;
