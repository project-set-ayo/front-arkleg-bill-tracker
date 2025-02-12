import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiWithoutAuth } from "../utils/axios";
import { useDelayedAction } from "./useDelayedAction";
import Cookies from "js-cookie";

const useConfirmEmail = (key: string | undefined) => {
  const navigate = useNavigate();
  const delayedLoginRedirect = useDelayedAction(() => navigate("/login"));
  const [status, setStatus] = useState<string | null>(
    "Verifying your email...",
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!key) {
        setError("Invalid verification key.");
        setStatus(null);
        setLoading(false);
        return;
      }

      try {
        const response = await apiWithoutAuth.post(
          "/auth/register/verify-email/",
          { key },
        );

        Cookies.set("authToken", key, { expires: 7 }); // Expires in 7 days
        console.log("success: ", response.data);
        setStatus(
          "Your email has been successfully verified! Proceed to login.",
        );
        delayedLoginRedirect();
      } catch (err: any) {
        setError("Verification failed. Please try again.");
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [key]);

  return { status, error, loading };
};

export default useConfirmEmail;
