// hooks/useFetchWithAuth.ts
import { tokenAtom } from "@/atoms/AuthAtom";
import { fetchWithAuth } from "@/services/fetchWithAuth";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetchWithAuth = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = useAtomValue(tokenAtom);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const res = await fetchWithAuth(token, url);
          console.log("status", res.status);
          if (res.status === 401) {
            alert("Please Log in");
            navigator("/login");
          }
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          const data = await res.json();
          setData(data);
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
