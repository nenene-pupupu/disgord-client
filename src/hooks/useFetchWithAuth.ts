// hooks/useFetchWithAuth.ts
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { fetchWithAuth } from "@/services/fetchWithAuth";

const useFetchWithAuth = <T>(url: string) => {
  const { token } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetchWithAuth(token, url);
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [token, url]);

  return { data, error, loading };
};

export default useFetchWithAuth;
