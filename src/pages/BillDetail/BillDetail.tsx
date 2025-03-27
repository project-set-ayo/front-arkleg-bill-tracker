import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import useBillDetail from "../../hooks/useBillDetail";
import BillInteractionForm from "../../components/BillInteractionForm";
import AdminBillInfo from "../../components/AdminBillInfo";
import AdminBillUpdateForm from "../../components/AdminBillUpdateForm";
import AdBanner from "../../components/AdBanner";
import BillTextDocument from "../../components/BillTextDocument";
import BillHistoryItem from "../../components/BillHistoryItem";
import SponsorCard from "../../components/SponsorCard";
import BillAnalysisUploader from "../../components/BillAnalysisUploader";

const BillDetail: React.FC = () => {
  const { user, userLoading, userError } = useUserInfo();
  const { billId } = useParams<{ billId: string }>();
  const { billInfo, adminInfo, userInfo, loading, error } = useBillDetail(
    billId || "",
  );

  const accordion_xs = {
    margin: 0,
    padding: 0,
    borderRadius: 6,
    boxShadow: "none",
    border: "1px solid transparent",
    "&::before": {
      display: "none",
    },
  };

  const drafts =
    billInfo &&
    billInfo.texts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const amendments =
    billInfo &&
    billInfo.amendments.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const sponsors = billInfo && billInfo.sponsors;

  const history_items =
    billInfo &&
    billInfo.history.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const calendar_items =
    billInfo &&
    billInfo.calendar.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const latest_history_item = history_items && history_items[0];

  const latest_calendar_item = calendar_items && calendar_items[0];

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
              <AdBanner style="square" />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="h6">Status</Typography>
              <Typography sx={{ mt: 2 }} variant="body1" gutterBottom>
                <p>
                  Status: {billInfo.status} on {billInfo.status_date}
                </p>
                {latest_history_item && (
                  <p>Action: {latest_history_item.action}</p>
                )}
                {latest_calendar_item && (
                  <p>
                    {latest_calendar_item.type}: {latest_calendar_item.date} in{" "}
                    {latest_calendar_item.location}
                  </p>
                )}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Bill Description */}
              <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6">Description</Typography>
                <Typography sx={{ mt: 2 }} variant="body1" gutterBottom>
                  {billInfo.description}
                </Typography>
              </Paper>

              {/* Administrator Grading */}
              <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                {user?.is_admin ? (
                  <AdminBillUpdateForm billId={billId} />
                ) : (
                  <AdminBillInfo billId={billId} adminInfo={adminInfo} />
                )}
              </Paper>

              {user?.is_admin && (
                <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                  <BillAnalysisUploader billId={billId} />
                </Paper>
              )}

              {/* User Grading */}
              <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                <BillInteractionForm legiscanBillId={billId} />
              </Paper>
            </Box>
          </Grid>

          <Grid container size={{ xs: 12, md: 4 }}>
            {/* Bill Documents */}
            <Box display="flex" flexDirection="column" gap={2}>
              {drafts && (
                <Grid size={{ xs: 12, md: 12 }}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                    <Accordion sx={{ ...accordion_xs }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                          Drafts ({drafts.length})
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        {drafts
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime(),
                          )
                          .map((text) => (
                            <BillTextDocument key={text.doc_id} {...text} />
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>
              )}

              {amendments && (
                <Grid size={{ xs: 12, md: 12 }}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                    <Accordion sx={{ ...accordion_xs }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                          Amendments ({amendments.length})
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        {amendments
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime(),
                          )
                          .map((text) => (
                            <BillTextDocument key={text.doc_id} {...text} />
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>
              )}

              {/* Bill Sponsors */}
              {sponsors && (
                <Grid size={{ xs: 12, md: 12 }}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                    <Accordion sx={{ ...accordion_xs }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                          Sponsors ({sponsors.length})
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        {sponsors.map((sponsor) => (
                          <SponsorCard key={sponsor.people_id} {...sponsor} />
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>
              )}

              {/* Bill History */}
              {history_items && (
                <Grid size={{ xs: 12, md: 12 }}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                    <Accordion sx={{ ...accordion_xs }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                          Bill History ({history_items.length})
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        {history_items
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime(), // Latest first
                          )
                          .map((history, index) => (
                            <BillHistoryItem key={index} {...history} />
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>
              )}
            </Box>
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
