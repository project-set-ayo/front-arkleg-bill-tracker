import { useState, useEffect } from "react";
import { api } from "../utils/axios"; // Import existing API module

interface AdminBillUpdateData {
  admin_note?: string;
  admin_stance?: string;
  admin_expanded_analysis_url?: string;
  tag_names?: string[];
}

interface BillResponse extends AdminBillUpdateData {
  legiscan_bill_id: string;
  bill_number: string;
  bill_title: string;
  tags: string[];
}

export function useAdminBill(billId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bill, setBill] = useState<BillResponse | null>(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await api.get<BillResponse>(`/bill/admin/${billId}`);
        setBill(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch bill details");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billId]);

  const updateBill = async (data: AdminBillUpdateData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<BillResponse>(
        `/bill/admin/${billId}/`,
        data
      );
      setBill(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save bill");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { bill, loading, error, updateBill };
}
