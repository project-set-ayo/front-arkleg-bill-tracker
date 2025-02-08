import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface UserKeyword {
  id: number;
  keyword: string;
}

export default function useUserKeywords() {
  const [keywords, setKeywords] = useState<UserKeyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const USER_KEYWORDS_URL = "/bill/user/keywords/";

  useEffect(() => {
    const fetchKeywords = async () => {
      setLoading(true);
      try {
        const response = await api.get(USER_KEYWORDS_URL);
        setKeywords(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load keywords");
      }
      setLoading(false);
    };

    fetchKeywords();
  }, []);

  const addKeyword = async (keyword: string) => {
    try {
      const response = await api.post(USER_KEYWORDS_URL, { keyword });
      setKeywords((prev) => [...prev, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.keyword?.[0] || "Failed to add keyword");
    }
  };

  const removeKeyword = async (keywordId: number) => {
    try {
      await api.delete(USER_KEYWORDS_URL + keywordId + "/");
      setKeywords((prev) => prev.filter((kw) => kw.id !== keywordId));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to remove keyword");
    }
  };

  const bulkRemoveKeywords = async (keywordIds: number[]) => {
    try {
      await api.delete(USER_KEYWORDS_URL + "bulk_delete/", {
        data: { keyword_ids: keywordIds },
      });
      setKeywords((prev) => prev.filter((kw) => !keywordIds.includes(kw.id)));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to remove keywords");
    }
  };

  return {
    keywords,
    loading,
    error,
    addKeyword,
    removeKeyword,
    bulkRemoveKeywords,
  };
}
