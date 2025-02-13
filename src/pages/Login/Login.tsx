import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/arkleg-color.png";
import useLogin from "../../hooks/useLogin";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, errors, isLoading } = useLogin();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin(formData.email, formData.password);
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
          <img src={logo} alt="Logo" width={220} height={"auto"} />
        </Box>

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
          label="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <Box textAlign="end">
          <Typography variant="body2" color="textSecondary">
            <RouterLink
              to="/forgot-password"
              style={{ textDecoration: "underline" }}
            >
              Forgot Password?
            </RouterLink>
          </Typography>
        </Box>

        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        <Divider variant="middle">
          <Typography variant="body2" color="textSecondary">
            Or
          </Typography>
        </Divider>

        <GoogleLoginButton
          label="Login with Google"
          onSuccess={() => navigate("/")}
        />

        {/* Navigate to Login if the user already has an account */}
        <Box textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Not registered yet?{" "}
            <RouterLink to="/register" style={{ textDecoration: "underline" }}>
              Register here
            </RouterLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
