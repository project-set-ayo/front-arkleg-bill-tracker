import { Paper, Box } from "@mui/material";
import TagFilterBillList from "../../components/TagFilterBillList";
import AdBanner from "../../components/AdBanner";

const TagSearchPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <AdBanner style="horizontal" />
      {/* Session List */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
        <TagFilterBillList />
      </Paper>
    </Box>
  );
};

export default TagSearchPage;
