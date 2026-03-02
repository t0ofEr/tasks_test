const TaskItem = ({ task }) => (
  <div className="task-card">
    <div className="task-header">
      <strong>{task.title}</strong>
      <span className="badge">{task.category}</span>
    </div>
    
    <p className="task-desc">{task.description}</p>
    
    {task.subtasks?.length > 0 && (
      <div className="subtasks">
        <small className="sub-title">Pasos IA:</small>
        {task.subtasks.map(s => (
          <div key={s.id} className="sub-item">✓ {s.title}</div>
        ))}
      </div>
    )}

    {/* SECCIÓN DEL CREADOR */}
    <div className="task-footer">
      <small className="creator-info">
        👤 <span className="label">Creador:</span> {task.user || "Usuario desconocido"}
      </small>
      <small className="date-info">
        📅 {new Date(task.created_at).toLocaleDateString()}
      </small>
    </div>
  </div>
);

export default TaskItem;