import { useState } from "react";
import { api } from "../utils/axios";

interface BillAnalysis {
  id: number;
  bill: string;
  file: string;
  description: string;
  uploaded_at: string;
}

export default function useBillAnalysis(billId: string) {
  const [analyses, setAnalyses] = useState<BillAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string | null>>({}); // Store field-specific errors

  // Fetch all analyses for a bill
  const fetchAnalyses = async () => {
    setLoading(true);
    setError({});
    try {
      const response = await api.get<BillAnalysis[]>(
        `/bill/analysis/${billId}/`,
      );
      setAnalyses(response.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setAnalyses([]); // If 404, set analyses to an empty list instead of throwing an error
      } else {
        setError({
          general: err.response?.data?.error || "Failed to fetch analyses.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Upload a new analysis
  const uploadAnalysis = async (file: File, description: string) => {
    setLoading(true);
    setError({});
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      const response = await api.post<BillAnalysis>(
        `/bill/analysis/${billId}/upload/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      setAnalyses((prev) => [...prev, response.data]);
    } catch (err: any) {
      // Extract error messages for specific fields
      const responseErrors = err.response?.data || {};
      const formattedErrors: Record<string, string | null> = {};

      Object.entries(responseErrors).forEach(([key, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          formattedErrors[key] = messages[0]; // Display first error message per field
        }
      });

      setError(formattedErrors);
    } finally {
      setLoading(false);
    }
  };

  // Delete an analysis
  const deleteAnalysis = async (id: number) => {
    setLoading(true);
    setError({});
    try {
      await api.post(`/bill/analysis/${id}/delete/`);
      setAnalyses((prev) => prev.filter((analysis) => analysis.id !== id));
    } catch (err: any) {
      setError({
        general: err.response?.data?.error || "Failed to delete analysis.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    analyses,
    loading,
    error,
    fetchAnalyses,
    uploadAnalysis,
    deleteAnalysis,
  };
}
