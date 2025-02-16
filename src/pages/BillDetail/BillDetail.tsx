import React from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import useBillDetail from "../../hooks/useBillDetail";
import BillInteractionForm from "../../components/BillInteractionForm";
import AdminBillInfo from "../../components/AdminBillInfo";
import AdminBillUpdateForm from "../../components/AdminBillUpdateForm";
import AdBanner from "../../components/AdBanner";
import BillTextDocument from "../../components/BillTextDocument";
import BillCalendarEvent from "../../components/BillCalendarEvent";
import SponsorCard from "../../components/SponsorCard";

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
    <Box sx={{ width: "100%" }}>
      {billInfo ? (
        <Grid container spacing={2} size={{ xs: 12 }}>
          {/* Bill Details Section */}
          <Grid container size={{ xs: 12 }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {billInfo.bill_number}
                </Typography>
                <Typography variant="h5">{billInfo.title}</Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <AdBanner />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="h6">Description</Typography>
              <Typography sx={{ mt: 2 }} variant="body1" gutterBottom>
                {billInfo.description}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Administrator Grading */}
              <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                {user?.is_admin ? (
                  <AdminBillUpdateForm billId={billId} />
                ) : (
                  <AdminBillInfo adminInfo={adminInfo} />
                )}
              </Paper>

              {/* User Grading */}
              <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                <BillInteractionForm legiscanBillId={billId} />
              </Paper>
            </Box>
          </Grid>

          <Grid container size={{ xs: 12, md: 4 }}>
            {/* Bill Documents */}
            {billInfo.texts.length > 0 && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="h6">Documents</Typography>

                  {billInfo.texts
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                    )
                    .map((text) => (
                      <BillTextDocument key={text.doc_id} {...text} />
                    ))}
                </Paper>
              </Grid>
            )}

            {/* Bill Sponsors */}
            {billInfo.sponsors.length > 0 && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="h6">Sponsors</Typography>

                  {billInfo.sponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.people_id} {...sponsor} />
                  ))}
                </Paper>
              </Grid>
            )}

            {/* Bill Calendar Events */}
            {billInfo.calendar.length > 0 && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="h6">Calendar Events</Typography>

                  {billInfo.calendar
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                    )
                    .map((event, index) => (
                      <BillCalendarEvent key={index} {...event} />
                    ))}
                </Paper>
              </Grid>
            )}
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
