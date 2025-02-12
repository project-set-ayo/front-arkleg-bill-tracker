import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/endpoints";

const useLogin = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      await login(email, password);
      navigate("/"); // Redirect on success
    } catch (error: any) {
      const responseErrors = error.response?.data || {};
      const formattedErrors: Record<string, string | null> = {};

      // Extract field-specific errors
      Object.entries(responseErrors).forEach(([key, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          formattedErrors[key] = messages[0]; // Show only the first error per field
        }
      });

      setErrors(formattedErrors);
    }

    setIsLoading(false);
  };

  return { handleLogin, errors, isLoading };
};

export default useLogin;
