import { useState, useEffect } from "react";
import { api } from "../utils/axios";
import { Bill } from "../types/bill";
import { Session } from "../types/session";
import { Sponsor } from "../types/sponsor";

interface SponsoredSessionsBills {
  sponsor: Sponsor | null;
  sessions: Session[];
  bills: Bill[];
}

export default function useSponsoredBills(peopleId: number | null) {
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!peopleId) return;

    const fetchSponsoredBills = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<SponsoredSessionsBills>(
          `/bill/search/sponsored-bills/`,
          { params: { people_id: peopleId } },
        );
        setSponsor(response.data.sponsor);
        setSessions(response.data.sessions);
        setBills(response.data.bills);
        console.log("sponsor: ", sponsor);
        console.log("sessions: ", sessions);
        console.log("bills: ", bills);
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to fetch sponsored bills.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSponsoredBills();
  }, [peopleId]);

  return { sponsor, sessions, bills, loading, error };
}
