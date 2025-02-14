import { useState, useEffect } from "react";
import { api } from "../utils/axios";
import { Session } from "../types/session";
import { Bill } from "../types/bill";

interface SessionBills {
  session: Session;
  bills: Bill[];
}

export default function useBills(sessionId: number | null) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchBills = async () => {
      try {
        const response = await api.get<SessionBills>("bill/search/bill/", {
          params: { session_id: sessionId },
        });
        setSession(response.data.session);
        setBills(response.data.bills);
        console.log("session: ", session);
        console.log("bills: ", bills);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch bills.");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [sessionId]);

  return { bills, session, loading, error };
}
