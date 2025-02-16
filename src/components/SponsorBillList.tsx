import { useState } from "react";
import { List, ListItem, Typography, Box, IconButton } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import useSponsoredBills from "../hooks/useSponsoredBills";
import { Link } from "react-router-dom";

const SponsorBillList = ({
  sessionId,
  peopleId,
}: {
  sessionId: number;
  peopleId: number;
}) => {
  const HOVER_TIMER = 300; // seconds

  const { bills, loading, error } = useSponsoredBills(peopleId);
  const [hoveredBill, setHoveredBill] = useState<number | null>(null);

  return (
    <List>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {bills
        .filter((bill) => bill.session_id === sessionId)
        .map((bill) => (
          <ListItem
            key={bill.bill_id}
            sx={{ p: 1, py: 0, display: "flex", alignItems: "center" }}
            onMouseEnter={() =>
              setTimeout(() => setHoveredBill(bill.bill_id), HOVER_TIMER)
            }
            onMouseLeave={() => setHoveredBill(null)}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Link
                to={`/bill/${bill.bill_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography>{bill.number}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {bill.title}
                </Typography>
              </Link>
            </Box>

            {/* External Link Icon - Appears with a transition when hovered */}
            <IconButton
              component={Link}
              to={`/bill/${bill.bill_id}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                opacity: hoveredBill === bill.bill_id ? 1 : 0,
                transform:
                  hoveredBill === bill.bill_id
                    ? "translateX(0)"
                    : "translateX(10px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <OpenInNew fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
    </List>
  );
};

export default SponsorBillList;
