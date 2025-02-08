import { useState } from "react";
import { useTags } from "../hooks/useTags";
import { useBillsByTags } from "../hooks/useBillsByTags";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Chip,
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Label";

const TagFilterBillList = () => {
  const { tags } = useTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    bills,
    loading: billsLoading,
    error: billsError,
  } = useBillsByTags(selectedTags);
  const navigate = useNavigate();

  // Filter available tags based on input search
  const filteredTags = tags
    .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((tag) => !selectedTags.includes(tag));

  // Handle selecting a tag with Tab
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab" && filteredTags.length > 0) {
      event.preventDefault();
      handleTagSelect(filteredTags[0]);
    } else if (
      event.key === "Backspace" &&
      searchTerm === "" &&
      selectedTags.length > 0
    ) {
      handleTagRemove(selectedTags[selectedTags.length - 1]); // Remove last selected tag
    }
  };

  // Handle selecting a tag
  const handleTagSelect = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchTerm(""); // Clear search input after selection
  };

  // Handle removing a tag
  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // Navigate to bill detail page
  const handleBillClick = (billId: string) => {
    navigate(`/bill/${billId}`);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      {/* Tag Search Input */}
      <TextField
        label="Search Tags"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type to search... (Press Tab to select)"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Display selected tags as chips */}
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleTagRemove(tag)}
            color="primary"
            sx={{ fontSize: 14 }}
          />
        ))}
      </Box>

      {/* Display available tag suggestions */}
      {searchTerm && filteredTags.length > 0 && (
        <List
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            mt: 1,
            maxHeight: 150,
            overflowY: "auto",
          }}
        >
          {filteredTags.map((tag) => (
            <ListItem key={tag} onClick={() => handleTagSelect(tag)}>
              <TagIcon sx={{ mr: 1, color: "gray" }} />
              <ListItemText primary={tag} />
            </ListItem>
          ))}
        </List>
      )}

      {/* Display Bills */}
      <Box sx={{ mt: 4 }}>
        {billsLoading ? (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        ) : billsError ? (
          <Typography color="error">{billsError}</Typography>
        ) : bills.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <TagIcon sx={{ fontSize: 50, color: "gray" }} />
            <Typography variant="body1" color="textSecondary">
              No tags selected. Please select a tag to filter bills.
            </Typography>
          </Box>
        ) : (
          <List>
            {bills.map((bill) => (
              <ListItem
                key={bill.legiscan_bill_id}
                onClick={() => handleBillClick(bill.legiscan_bill_id)}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {bill.bill_number}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2, // Limits bill title to n lines
                        overflow: "hidden",
                      }}
                    >
                      {bill.bill_title}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default TagFilterBillList;
