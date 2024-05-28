import { useAuth } from "./useAuth";

const useFetchWithAuth = () => {
  const { token } = useAuth();

  const fetchWithAuth = async (input: RequestInfo, init?: RequestInit) => {
    const headers = new Headers(init?.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(input, {
      ...init,
      headers,
    });

    return response;
  };

  return fetchWithAuth;
};

export default useFetchWithAuth;
