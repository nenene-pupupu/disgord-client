const API_URL = "http://localhost:8080";

export const signin = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
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
    body: JSON.stringify({ username, password, displayname }),
  });
  return response.json();
};
