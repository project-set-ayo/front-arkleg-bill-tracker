import { Paper, Container } from "@mui/material";
import TagFilterBillList from "../../components/TagFilterBillList";
import AdBanner from "../../components/AdBanner";

const TagSearchPage = () => {
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
        <TagFilterBillList />
      </Paper>
    </Container>
  );
};

export default TagSearchPage;
