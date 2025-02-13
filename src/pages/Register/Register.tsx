import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Card,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import useRegister from "../../hooks/useRegister";
import logo from "../../assets/images/arkleg-mono.png";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { handleRegister, errors, successMessage, isLoading } = useRegister();
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleRegister(formData.email, formData.password1, formData.password2);
  };

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
        component="form"
        onSubmit={handleSubmit}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="Logo" width={180} height={"auto"} />
        </Box>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errors.non_field_errors && (
          <Alert severity="error">{errors.non_field_errors}</Alert>
        )}

        <EmailInput
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <PasswordInput
          name="password1"
          label="password"
          value={formData.password1}
          onChange={handleInputChange}
          error={Boolean(errors.password1)}
          helperText={errors.password1}
        />
        <PasswordInput
          name="password2"
          label="confirm password"
          value={formData.password2}
          onChange={handleInputChange}
          error={Boolean(errors.password2)}
          helperText={errors.password2}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Register"}
        </Button>

        <GoogleLoginButton
          label="Register with Google"
          onSuccess={() => navigate("/")}
        />

        {/* Navigate to Login if the user already has an account */}
        <Box textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <RouterLink to="/login" style={{ textDecoration: "underline" }}>
              Login here
            </RouterLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Register;
