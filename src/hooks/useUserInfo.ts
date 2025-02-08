import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface UserInfo {
  id: number;
  email: string;
  is_admin: boolean;
}

export function useUserInfo() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get<UserInfo>("/user/profile/");
        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { user, loading, error };
}
