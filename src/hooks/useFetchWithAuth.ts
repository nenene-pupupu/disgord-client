// hooks/useFetchWithAuth.ts
import { tokenAtom } from "@/atoms/Auth";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const useFetchWithAuth = <T>(url: string) => {
  // const { token } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = useAtomValue(tokenAtom);

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
