export const fetchWithAuth = async (
  token: string,
  input: RequestInfo,
  init?: RequestInit,
) => {
  const makeRequest = async (token: string) => {
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
      credentials: "include",
    });

    return response;
  };

  try {
    let response = await makeRequest(token);
    console.log(response);
    if (response.status === 401) {
      // Try to refresh the token
      const refreshResponse = await fetch(
        `http://${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newToken = data.accessToken;

        // Save the new token to localStorage or any storage you're using
        localStorage.setItem("accessToken", newToken);

        // Retry the original request with the new token
        response = await makeRequest(newToken);
      } else {
        // If token refresh fails, log out the user
        await fetch(`http://${import.meta.env.VITE_SERVER_URL}/auth/sign-out`, {
          method: "POST",
          credentials: "include",
        });
        alert("Please log in!");
        localStorage.removeItem("accessToken");
        // window.location.href = "/login";
        return;
      }
    }

    return response;
  } catch (error) {
    console.error("fetchWithAuth error", error);
    throw error;
  }
};
