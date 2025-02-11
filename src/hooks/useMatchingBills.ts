import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface Bill {
  bill_id: number;
  bill_number: string;
  title: string;
}

type MatchingBillsResponse = Record<string, Bill[]>; // { "education": [...], "healthcare": [...] }

export default function useMatchingBills() {
  const [bills, setBills] = useState<MatchingBillsResponse>({});
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchingBills = async () => {
      setLoading(true);
      try {
        const response = await api.get("/bill/user/keyword/matching-bills/");
        setBills(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.detail || "Failed to fetch matching bills",
        );
      }
      setLoading(false);
    };

    fetchMatchingBills();
  }, []);

  // Update filtered bills when the selected keyword changes
  useEffect(() => {
    if (selectedKeyword && bills[selectedKeyword]) {
      setFilteredBills(bills[selectedKeyword]);
    } else {
      setFilteredBills(Object.values(bills).flat()); // Show all if no keyword selected
    }
  }, [selectedKeyword, bills]);

  return {
    bills,
    filteredBills,
    selectedKeyword,
    setSelectedKeyword,
    loading,
    error,
  };
}
