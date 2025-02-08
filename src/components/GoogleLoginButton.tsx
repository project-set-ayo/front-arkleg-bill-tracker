import { AuthenticateWithGoogle } from "../utils/endpoints";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";

interface LoginProps {
  onSuccess: () => void;
}

const GoogleLoginButton = ({ onSuccess }: LoginProps) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Access Token:", tokenResponse);
      await AuthenticateWithGoogle(tokenResponse.access_token);
      onSuccess();
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return <Button onClick={login}>Login with Google</Button>;
};

export default GoogleLoginButton;
