import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useUserKeywords from "../hooks/useUserKeywords";

const UserKeywordManager: React.FC = () => {
  const {
    keywords,
    loading,
    error,
    addKeyword,
    removeKeyword,
    bulkRemoveKeywords,
  } = useUserKeywords();
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const allSelected =
    !!keywords.length && selectedKeywords.length === keywords.length; // Check if all are selected
  const isIndeterminate = selectedKeywords.length > 0 && !allSelected; // Check if partially selected

  const handleAddKeyword = async () => {
    if (newKeyword.trim()) {
      await addKeyword(newKeyword);
      setNewKeyword("");
    }
  };

  const handleCheckboxChange = (keywordId: number) => {
    setSelectedKeywords((prev) =>
      prev.includes(keywordId)
        ? prev.filter((id) => id !== keywordId)
        : [...prev, keywordId],
    );
  };

  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      setSelectedKeywords(keywords.map((keyword) => keyword.id)); // Select all
    } else {
      setSelectedKeywords([]); // Deselect all
    }
  };

  const handleBulkDelete = async () => {
    await bulkRemoveKeywords(selectedKeywords);
    setSelectedKeywords([]); // Clear selection after delete
    setConfirmDialogOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Tracked Keywords
      </Typography>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Bills matching saved keywords will appear under Matching Bills on your
        home page.
      </Typography>

      {/* Add Keyword Input */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="New Keyword (e.g medicaid, tax)"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddKeyword}>
          Add
        </Button>
      </Box>

      {/* Select All Checkbox */}
      <Box sx={{ mb: 2 }}>
        <Checkbox
          indeterminate={isIndeterminate}
          checked={allSelected}
          onChange={(e) => handleSelectAllChange(e.target.checked)}
        />
        <Typography component="span">Select All</Typography>
      </Box>

      {/* Keyword List with Checkboxes */}
      <List>
        {keywords.map((keyword) => (
          <ListItem
            key={keyword.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => removeKeyword(keyword.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={selectedKeywords.includes(keyword.id)}
              onChange={() => handleCheckboxChange(keyword.id)}
            />
            {keyword.keyword}
          </ListItem>
        ))}
      </List>

      {/* Bulk Delete Button */}
      {selectedKeywords.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={() => setConfirmDialogOpen(true)}
        >
          Delete Selected ({selectedKeywords.length})
        </Button>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete these keywords? You will no longer
            receive email alerts for them.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleBulkDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserKeywordManager;
