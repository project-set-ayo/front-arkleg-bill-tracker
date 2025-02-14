import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import useBills from "../hooks/useBills";

interface Props {
  sessionId: number;
}

const BillList: React.FC<Props> = ({ sessionId }) => {
  const { bills, loading, error } = useBills(sessionId);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (bills.length === 0)
    return <Typography>No bills found for this session.</Typography>;

  return (
    <List>
      {bills.map((bill) => (
        <ListItem key={bill.bill_id} divider>
          <ListItemText primary={bill.bill_number} secondary={bill.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default BillList;
