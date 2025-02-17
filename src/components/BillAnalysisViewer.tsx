import React, { useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import useBillAnalysis from "../hooks/useBillAnalysis";
import BillAnalysisCard from "./BillAnalysisCard";

interface BillAnalysisViewerProps {
  billId: string;
}

const BillAnalysisViewer: React.FC<BillAnalysisViewerProps> = ({ billId }) => {
  const { analyses, loading, error, fetchAnalyses } = useBillAnalysis(billId);

  useEffect(() => {
    fetchAnalyses();
  }, [billId]);

  return (
    <Box>
      <Typography variant="subtitle1">Analysis Documents</Typography>

      {loading && <CircularProgress />}
      {error.general && <Alert severity="error">{error.general}</Alert>}

      {analyses.length === 0 && !loading && (
        <Typography variant="body2" color="textSecondary">
          No analysis documents available.
        </Typography>
      )}

      {analyses
        .sort(
          (a, b) =>
            new Date(b.uploaded_at).getTime() -
            new Date(a.uploaded_at).getTime(),
        )
        .map((analysis) => (
          <BillAnalysisCard key={analysis.id} {...analysis} />
        ))}
    </Box>
  );
};

export default BillAnalysisViewer;
