import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface Bill {
  relevance: number; // Relevance score
  state: string; // State abbreviation
  bill_number: string; // Bill number (e.g., "HB1072")
  bill_id: number; // Unique ID for the bill
  change_hash: string; // Hash representing the latest change
  url: string; // URL for the bill details page
  text_url: string; // URL for the bill text
  research_url: string; // URL for bill research materials
  last_action_date: string; // Date of the last action
  last_action: string; // Description of the last action
  title: string; // Bill title/description
}

interface SearchParams {
  bill_number?: string;
  query?: string;
  sponsor?: string;
  chamber?: "Senate" | "House";
  type?: "Bill" | "Resolution" | "Joint Resolution";
}

export default function useBillSearch(searchParams: SearchParams) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/bill/search/", {
          params: searchParams,
        });
        setBills(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch bills");
      }

      setLoading(false);
    };

    fetchBills();
  }, [searchParams]);

  return { bills, loading, error };
}
