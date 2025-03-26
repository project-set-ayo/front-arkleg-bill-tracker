import { useState } from "react";
import { Box, Paper, Tabs, Tab, Container, useMediaQuery } from "@mui/material";
import { Article, FindInPage, Person } from "@mui/icons-material";
import { Theme } from "@mui/material/styles";
import SessionList from "../../components/SessionList";
import SessionBillList from "../../components/SessionBillList";
import SessionSponsorList from "../../components/SessionSponsorList";
import usePersistedLegSession from "../../hooks/usePersistedLegSession";
import TextSearchBills from "../../components/TextSearchBills";
import AdBanner from "../../components/AdBanner";

const SessionPage = () => {
  const { selectedLegSession, updateLegSession } = usePersistedLegSession();
  const [activeTab, setActiveTab] = useState(0);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  return (
    <Container
      sx={{
        mt: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdBanner style="horizontal" />

      {/* Session List */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
        <SessionList
          onSelect={updateLegSession}
          selectedSession={selectedLegSession}
        />
      </Paper>

      {/* Tabs and Content */}
      {selectedLegSession && (
        <>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
          >
            <Tab
              icon={<Article />}
              iconPosition="start"
              label={isMobile ? undefined : "Bills"}
            />
            <Tab
              icon={<FindInPage />}
              iconPosition="start"
              label={isMobile ? undefined : "Text Search"}
            />
            <Tab
              icon={<Person />}
              iconPosition="start"
              label={isMobile ? undefined : "Sponsors"}
            />
          </Tabs>

          <Paper elevation={1} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
            {activeTab === 0 && (
              <SessionBillList sessionId={selectedLegSession.session_id} />
            )}
            {activeTab === 1 && (
              <TextSearchBills sessionId={selectedLegSession.session_id} />
            )}
            {activeTab === 2 && (
              <SessionSponsorList sessionId={selectedLegSession.session_id} />
            )}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default SessionPage;
