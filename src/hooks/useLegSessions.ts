import { useState, useEffect } from "react";
import { api } from "../utils/axios";
import { Session } from "../types/session";

export default function useLegSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get<Session[]>("bill/search/session/");
        setSessions(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return { sessions, loading, error };
}
