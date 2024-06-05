export const fetchWithAuth = async (
  token: string,
  input: RequestInfo,
  init?: RequestInit,
) => {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    });

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(input, {
      ...init,
      headers,
    });

    if (response.status === 401) {
      alert("Please log in!");
      window.location.href = "/login";
      return;
    }

    return response;
  } catch (error) {
    console.error("fetchWithAuth error", error);
    throw error;
  }
};
