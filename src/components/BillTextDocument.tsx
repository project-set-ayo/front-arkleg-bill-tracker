import React from "react";
import { Box, Typography } from "@mui/material";
import PdfViewer from "./PdfViewer";

interface BillTextDocumentProps {
  doc_id: number;
  date: string;
  type: string;
  title?: string;
  state_link: string;
}

const BillTextDocument: React.FC<BillTextDocumentProps> = ({
  date,
  type,
  title,
  state_link,
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
          {title ? title : type}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {date}
        </Typography>
      </Box>
      <PdfViewer pdfUrl={state_link} label={`View ${type} PDF`} />
    </Box>
  );
};

export default BillTextDocument;
