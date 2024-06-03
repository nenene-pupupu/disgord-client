export const fetchWithAuth = async (
  token: string,
  input: RequestInfo,
  init?: RequestInit,
) => {
  try {
    const headers = new Headers(init?.headers || {});

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const method = init?.method?.toUpperCase() || "GET";

    // Check if the method is GET or HEAD and ensure no body is included
    if ((method === "GET" || method === "HEAD") && init?.body) {
      console.warn(
        `Request with ${method} method cannot have a body. Removing the body.`,
      );
      delete init.body;
    }

    const response = await fetch(input, {
      ...init,
      headers,
    });

    return response;
  } catch (error) {
    console.error("fetchWithAuth error", error);
    throw error;
  }
};
