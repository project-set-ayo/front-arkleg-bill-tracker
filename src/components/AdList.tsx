import { Ad } from "../types/ad";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";

const AdList = ({
  adminAds,
  updateAdHandler,
  deleteAdHandler,
}: {
  adminAds: Ad[];
  updateAdHandler: (id: number, weight: number) => void;
  deleteAdHandler: (id: number) => void;
}) => {
  if (adminAds.length === 0) {
    return <Typography align="center">No ads available.</Typography>;
  }

  return (
    <List sx={{ p: 2 }}>
      {adminAds.map((ad) => (
        <ListItem key={ad.id} divider>
          {/* Ad Image */}
          <ListItemAvatar>
            <Avatar
              src={ad.image}
              alt={ad.title}
              variant="rounded"
              sx={{ width: 80, height: 80, p: 1 }}
            />
          </ListItemAvatar>

          {/* Ad Title */}
          <ListItemText primary={ad.title} />

          {/* Weight Controller */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton
              color="primary"
              size="small"
              onClick={() => updateAdHandler(ad.id, ad.weight + 1)}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>

            {/* Weight Display */}
            <Typography variant="body2" sx={{ fontWeight: "bold", my: 0.5 }}>
              {ad.weight}
            </Typography>

            <IconButton
              color="primary"
              size="small"
              onClick={() => updateAdHandler(ad.id, ad.weight - 1)}
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Delete Button */}
          <IconButton color="error" onClick={() => deleteAdHandler(ad.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default AdList;
