const API_URL = `http://${import.meta.env.VITE_SERVER_URL}`;

export const signin = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (response.status !== 200) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

export const signup = async (
  username: string,
  password: string,
  displayname: string,
) => {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password, displayname }),
  });

  if (response.status !== 201) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};
