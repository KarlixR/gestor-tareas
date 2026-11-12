import { useState } from "react";
import TaskForm from "../componentes/formularioTareas";
import TaskFilters from "../componentes/filtros";
import TaskColumn from "../componentes/columnaTareas";
import {
  getTasks,
  addTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../servicios/tareas";

const STATUSES = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en progreso", label: "En progreso" },
  { value: "completada", label: "Completada" },
];

const EMPTY_FILTERS = { search: "", status: "todos", priority: "todas" };

function Tasks({ user, onLogout }) {
  const [tasks, setTasks] = useState(() => getTasks(user.id));
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  function refresh() {
    setTasks(getTasks(user.id));
  }

  function handleAdd(data) {
    addTask(user.id, data);
    refresh();
  }

  function handleEdit(data) {
    updateTask(editingTask.id, data);
    setEditingTask(null);
    refresh();
  }

  function handleStatusChange(taskId, status) {
    updateTaskStatus(taskId, status);
    refresh();
  }

  function handleDelete(taskId) {
    deleteTask(taskId);
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    }
    refresh();
  }

  const searchText = filters.search.trim().toLowerCase();

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText);
    const matchesStatus =
      filters.status === "todos" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "todas" || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div>
      <h1>Gestor de tareas</h1>
      <p>Hola, {user.name}</p>
      <button onClick={onLogout}>Cerrar sesión</button>

      {editingTask ? (
        <TaskForm
          key={editingTask.id}
          initialData={editingTask}
          onAdd={handleEdit}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <TaskForm onAdd={handleAdd} />
      )}

      <TaskFilters filters={filters} onChange={setFilters} />

      {tasks.length > 0 && visibleTasks.length === 0 && (
        <p>Ninguna tarea coincide con la búsqueda o los filtros.</p>
      )}

      <div className="board">
        {STATUSES.map((status) => (
          <TaskColumn
            key={status.value}
            title={status.label}
            tasks={visibleTasks.filter((t) => t.status === status.value)}
            onStatusChange={handleStatusChange}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Tasks;