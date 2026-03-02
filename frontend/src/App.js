import { useTasks } from "./hooks/useTasks";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import "./styles/App.css";

function App() {
  const { tasks, token, loading, handleLogin, handleLogout, loadTasks } = useTasks();

  return (
    <div className="app-shell">
      {!token ? (
        <Login onLogin={handleLogin} loading={loading} />
      ) : (
        <div className="app-container">
          <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          <TaskList tasks={tasks} onTaskCreated={loadTasks} />
        </div>
      )}
    </div>
  );
}

export default App;