import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  is_admin: boolean;
}

export default function useUserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const USER_PROFILE_URL = "/user/profile/";

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(USER_PROFILE_URL);
        setUser(response.data);
      } catch (err: any) {
        setErrors({
          non_field_errors:
            err.response?.data?.detail || "Failed to load profile",
        });
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const response = await api.patch(USER_PROFILE_URL, updates);
      setUser(response.data);
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
  };

  return {
    user,
    isAdmin: user?.is_admin || false,
    loading,
    errors,
    setErrors,
    updateProfile,
  };
}
