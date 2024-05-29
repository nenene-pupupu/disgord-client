// services/fetchWithAuth.ts
export const fetchWithAuth = async (
  token: string,
  input: RequestInfo,
  init?: RequestInit,
) => {
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
