import { Box, Button, Card, Container, Typography, Alert } from "@mui/material";
import EmailInput from "../../components/EmailInput";
import { ChangeEvent, FormEvent, useState } from "react";

import { resetPasswordRequest } from "../../utils/endpoints";

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormData>({
    email: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  //Validate the input
  const validate = () => {
    const newErrors: FormData = {
      email: "",
    };

    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      try {
        const { detail } = await resetPasswordRequest(formData.email);
        setFormData({ email: "" });
        setSuccessMessage(detail);
      } catch (err: any) {
        setSuccessMessage("");
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minWidth: "200px",
          maxWidth: "400px",
          bgcolor: "#f3f3f3",
          p: 4,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: 3,
          }}
        >
          <Typography variant="h4">Forgot Password?</Typography>

          <Typography variant="body2" component={"p"} color="textSecondary">
            Enter your email address for instructions to reset your password.
          </Typography>
        </Box>

        <EmailInput
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email ? true : false}
          helperText={errors.email}
        />

        <Button type="submit" variant="contained">
          Reset Password
        </Button>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </Card>
    </Container>
  );
};

export default ForgotPassword;
