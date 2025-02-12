import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import useConfirmEmail from "../../hooks/useConfirmEmail";

const ConfirmEmail: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { status, error, loading } = useConfirmEmail(key);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minWidth: "200px",
          maxWidth: "400px",
          bgcolor: "#f3f3f3",
          p: 4,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Email Confirmation
          </Typography>

          {loading && <CircularProgress sx={{ my: 2 }} />}
          {status && !error && <Alert severity="success">{status}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          {!error && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="textSecondary">
                You will be redirected shortly...
              </Typography>
            </Box>
          )}

          {error && (
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/register")}
              >
                Go to Register
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default ConfirmEmail;
