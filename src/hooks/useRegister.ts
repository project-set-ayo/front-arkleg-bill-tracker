import { useState } from "react";
import { apiWithoutAuth } from "../utils/axios";

const useRegister = () => {
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (
    email: string,
    password1: string,
    password2: string,
  ) => {
    setIsLoading(true);
    setErrors({});
    setSuccessMessage(null);

    try {
      const response = await apiWithoutAuth.post("/auth/register/", {
        email,
        password1,
        password2,
      });
      setSuccessMessage(response.data.detail);
    } catch (error: any) {
      const responseErrors = error.response?.data || {};
      const formattedErrors: Record<string, string | null> = {};

      Object.entries(responseErrors).forEach(([key, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          formattedErrors[key] = messages[0]; // Display first error message
        }
      });

      setErrors(formattedErrors);
    }

    setIsLoading(false);
  };

  return { handleRegister, errors, successMessage, isLoading };
};

export default useRegister;
