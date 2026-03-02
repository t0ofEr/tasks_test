import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onTaskCreated }) => (
  <>
    <h2 className="title">Mis Tareas 📝</h2>
    <TaskForm onTaskCreated={onTaskCreated} />
    <div className="tasks-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
      {tasks.length === 0 && <p className="empty">No hay tareas pendientes.</p>}
    </div>
  </>
);

export default TaskList;