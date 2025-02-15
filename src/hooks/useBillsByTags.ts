import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface Bill {
  legiscan_bill_id: string;
  bill_number: string;
  bill_title: string;
  tags: string[];
  admin_stance: string;
  admin_note: string;
  admin_expanded_analysis_url: string;
}

export function useBillsByTags(selectedTags: string[]) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setBills([]);
      return;
    }

    const fetchBills = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = selectedTags.join(",");
        const response = await api.get<Bill[]>(
          `/bill/search-by-tags/?tags=${query}`,
        );
        setBills(response.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setBills([]);
        } else {
          setError(err.response?.data?.error || "Failed to fetch bills");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [selectedTags]);

  return { bills, loading, error };
}
