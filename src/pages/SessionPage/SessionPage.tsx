import { useState } from "react";
import { Paper, Tabs, Tab, Container } from "@mui/material";
import { Article, FindInPage, Person } from "@mui/icons-material";
import SessionList from "../../components/SessionList";
import SessionBillList from "../../components/SessionBillList";
import SessionSponsorList from "../../components/SessionSponsorList";
import usePersistedLegSession from "../../hooks/usePersistedLegSession";
import TextSearchBills from "../../components/TextSearchBills";

const SessionPage = () => {
  const { selectedLegSession, updateLegSession } = usePersistedLegSession();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container
      sx={{
        mt: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            <Tab icon={<Article />} iconPosition="start" label="Bills" />
            <Tab
              icon={<FindInPage />}
              iconPosition="start"
              label="Text Search"
            />
            <Tab icon={<Person />} iconPosition="start" label="Sponsors" />
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
