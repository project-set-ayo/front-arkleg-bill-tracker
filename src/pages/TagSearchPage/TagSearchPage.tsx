import { Paper, Container } from "@mui/material";
import TagFilterBillList from "../../components/TagFilterBillList";

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
      {/* Session List */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
        <TagFilterBillList />
      </Paper>
    </Container>
  );
};

export default TagSearchPage;
