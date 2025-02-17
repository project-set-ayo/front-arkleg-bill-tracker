import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import BillAnalysisViewer from "./BillAnalysisViewer";

interface AdminBillInfoProps {
  billId: string;
  adminInfo: {
    admin_note: string;
    admin_stance: "support" | "oppose" | "watch" | null;
    admin_expanded_analysis_url: string;
  } | null;
}

const stanceColors: Record<
  string,
  { label: string; color: "success" | "error" | "warning" }
> = {
  support: { label: "Support", color: "success" },
  oppose: { label: "Opposed", color: "error" },
  watch: { label: "Watched", color: "warning" },
};

const AdminBillInfo: React.FC<AdminBillInfoProps> = ({ billId, adminInfo }) => {
  if (!adminInfo) return null; // If no admin data, return nothing

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Admin Analysis
      </Typography>

      {/* Admin Stance */}
      {adminInfo.admin_stance && (
        <Chip
          label={adminInfo.admin_stance.toUpperCase()}
          color={stanceColors[adminInfo.admin_stance].color as any}
          variant="filled"
          size={"small"}
          sx={{ fontWeight: "bold" }}
        />
      )}

      {/* Admin Note */}
      <Typography variant="body1" sx={{ my: 2 }}>
        {adminInfo.admin_note || "No admin notes available."}
      </Typography>

      <BillAnalysisViewer billId={billId} />
    </Box>
  );
};

export default AdminBillInfo;
