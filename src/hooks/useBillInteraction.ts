import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface BillInteraction {
  stance: "approve" | "oppose" | "watch";
  note: string;
}

export function useBillInteraction(legiscanBillId: string) {
  const [interaction, setInteraction] = useState<BillInteraction>({
    stance: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user bill interaction when legiscanBillId changes
  useEffect(() => {
    const fetchInteraction = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/bill/user/interaction/${legiscanBillId}/`,
        );
        setInteraction(response.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          // Ignore 404, keep default interaction state
          console.warn(`No existing interaction for bill ${legiscanBillId}`);
        } else {
          setError("Failed to load bill interaction.");
          console.error("Error fetching bill interaction:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (legiscanBillId) {
      fetchInteraction();
    }
  }, [legiscanBillId]);

  // Function to update interaction
  const updateInteraction = async (data: BillInteraction) => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/bill/user/interaction/${legiscanBillId}/`, data);
      setInteraction(data); // Sync with latest saved state
    } catch (err: any) {
      setError("Failed to update bill interaction.");
      console.error("Error updating bill interaction:", err);
    } finally {
      setLoading(false);
    }
  };

  return { interaction, updateInteraction, loading, error };
}
