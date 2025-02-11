import React from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import useBillDetail from "../../hooks/useBillDetail";
import PdfViewer from "../../components/PdfViewer";
import BillInteractionForm from "../../components/BillInteractionForm";
import AdminBillInfo from "../../components/AdminBillInfo";
import AdminBillUpdateForm from "../../components/AdminBillUpdateForm";
import AdBanner from "../../components/AdBanner";

const BillDetail: React.FC = () => {
  const { user, userLoading, userError } = useUserInfo();
  const { billId } = useParams<{ billId: string }>();
  const { billInfo, adminInfo, userInfo, loading, error } = useBillDetail(
    billId || "",
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {billInfo ? (
        <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
          {/* Bill Details Section */}
          <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {billInfo.bill_number}
                </Typography>

                <Typography variant="h5">{billInfo.title}</Typography>
              </Paper>
            </Grid>

            {/* Bill Description & PDF Viewer */}
            <Grid container spacing={2} size={{ xs: 12, md: 8 }}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    {billInfo.description}
                  </Typography>
                  <PdfViewer
                    key={billInfo.texts[0]?.state_link}
                    pdfUrl={billInfo.texts[0]?.state_link}
                  />
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 12 }}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  {user?.is_admin ? (
                    <AdminBillUpdateForm billId={billId} />
                  ) : (
                    <AdminBillInfo adminInfo={adminInfo} />
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* Bill Calendar Events */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6">Bill Upcoming Events</Typography>
                <List>
                  {billInfo.calendar.map((event) => (
                    <ListItem key={event.event_hash}>
                      <ListItemText
                        primary={event.description}
                        secondary={event.date}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>

          {/* Sidebar (Can be used for Ads or Other Content) */}
          <Grid size={{ xs: 12, md: 3 }}>
            <AdBanner />
          </Grid>

          {/* Stance & Note Interaction */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <BillInteractionForm legiscanBillId={billId} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" color="error">
          Bill not found.
        </Typography>
      )}
    </Box>
  );
};

export default BillDetail;
