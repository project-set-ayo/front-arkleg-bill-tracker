import { useState, useEffect } from "react";
import { api } from "../utils/axios";
import { Session } from "../types/session";
import { Sponsor } from "../types/sponsor";

interface SessionSponsors {
  session: Session;
  people: Sponsor[];
}

export default function useLegSponsors(sessionId: number | null) {
  const [session, setSession] = useState<Session | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSponsors = async () => {
      try {
        const response = await api.get<SessionSponsors>(
          "bill/search/sponsor/",
          {
            params: { session_id: sessionId },
          },
        );
        setSession(response.data.session);
        setSponsors(response.data.people);
        console.log("session: ", session);
        console.log("sponsors: ", sponsors);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch sponsors.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, [sessionId]);

  return { session, sponsors, loading, error };
}
