import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface PdfViewerProps {
  pdfUrl: string;
  label?: string; // Optional label for accessibility or tooltip
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  label = "Open PDF",
}) => {
  const handleOpenPdf = () => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Tooltip title={label}>
      <IconButton onClick={handleOpenPdf} aria-label={label}>
        <PictureAsPdfIcon color="error" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default PdfViewer;
