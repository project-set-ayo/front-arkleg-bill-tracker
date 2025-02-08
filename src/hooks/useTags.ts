import { useState, useEffect } from "react";
import { api } from "../utils/axios";

export function useTags() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get<{ tags: string[] }>("/bill/tags/");
        setTags(response.data.tags);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch tags");
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
}
