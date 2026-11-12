function TaskItem({ task, onStatusChange, onEdit, onDelete }) {
  function handleDelete() {
    if (window.confirm(`¿Eliminar la tarea "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <li className={`task priority-${task.priority}`}>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <p>
        Vence: {task.dueDate} | Prioridad: {task.priority}
      </p>
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
      >
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
      {task.status !== "completada" && (
        <button onClick={() => onStatusChange(task.id, "completada")}>
          Marcar como completada
        </button>
      )}
      <button onClick={() => onEdit(task)}>Editar</button>
      <button onClick={handleDelete}>Eliminar</button>
    </li>
  );
}

export default TaskItem;