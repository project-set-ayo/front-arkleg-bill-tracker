import { AuthenticateWithGoogle } from "../utils/endpoints";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";

interface LoginProps {
  label?: string;
  onSuccess: () => void;
}

const GoogleLoginButton = ({
  label = "Login with Google",
  onSuccess,
}: LoginProps) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await AuthenticateWithGoogle(tokenResponse.access_token);
      onSuccess();
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return (
    <Button variant="contained" onClick={login}>
      {label}
    </Button>
  );
};

export default GoogleLoginButton;
