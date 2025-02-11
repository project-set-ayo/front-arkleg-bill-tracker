import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface UserProfile {
  email: string;
  phone_number: string;
  is_admin: boolean;
}

export default function useUserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const USER_PROFILE_URL = "/user/profile/";

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(USER_PROFILE_URL);
        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load profile");
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const response = await api.patch(USER_PROFILE_URL, updates);
      setUser(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update profile");
    }
  };

  return {
    user,
    isAdmin: user?.is_admin || false, // Always return a boolean value
    loading,
    error,
    updateProfile,
  };
}
