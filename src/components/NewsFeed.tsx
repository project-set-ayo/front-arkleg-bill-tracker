import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  CircularProgress,
  Pagination,
} from "@mui/material";
import useRssFeeds from "../hooks/useRssFeeds";

const NewsFeed: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // number of articles per page
  const { articles, loading, totalPages } = useRssFeeds(page, limit);

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={1} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Arkansas News Feed
        </Typography>

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <CircularProgress />
            <Typography variant="body1" color="textSecondary" mt={2}>
              Fetching latest news...
            </Typography>
          </Box>
        ) : articles.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <Typography variant="body1" color="textSecondary">
              No relevant news found.
            </Typography>
          </Box>
        ) : (
          <>
            <List>
              {articles.map((article, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={
                      <Link
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        {article.title}
                      </Link>
                    }
                    secondary={`${article.source} • ${new Date(article.pubDate).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>

            {/* ✅ Pagination Controls */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default NewsFeed;
