import { useState } from "react";
import { api } from "../utils/axios";
import { Bill } from "../types/bill";
import { Summary } from "../types/summary";

interface SummaryBills {
  summary: Summary;
  bills: Bill[];
}

export default function useTextSearchBills(
  sessionId: number | null,
  query: string,
  page: number = 1,
) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = async (sessionId: number, query: string, page: number) => {
    if (!sessionId || !query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get<SummaryBills>("/bill/search/text/", {
        params: { session_id: sessionId, query, page },
      });

      setBills(
        response.data.bills.map((bill) => ({ ...bill, id: bill.bill_id })),
      ); // Ensure unique row ID
      setSummary(response.data.summary);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    bills,
    totalPages,
    totalResults,
    loading,
    error,
    fetchBills,
  };
}
