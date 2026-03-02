import { useState, useEffect, useCallback } from "react";
import { taskApi } from "../api/taskApi";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    if (!token) return;
    try {
      const response = await taskApi.getTasks();
      const data = await response.json();
      if (Array.isArray(data)) setTasks(data);
    } catch (err) { console.error(err); }
  }, [token]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await taskApi.login(username, password);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        setToken(data.access);
        return { success: true };
      }
      return { success: false, msg: data.detail };
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  return { tasks, token, loading, handleLogin, handleLogout, loadTasks, setLoading };
};