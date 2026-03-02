const API_BASE = "http://localhost:8000/api/";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export const taskApi = {
  login: (username, password) => 
    fetch(`${API_BASE}login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }),

  getTasks: () => 
    fetch(`${API_BASE}tasks/`, { headers: getHeaders() }),

  createTask: (title, description) => 
    fetch(`${API_BASE}tasks/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ title, description }),
    }),
};