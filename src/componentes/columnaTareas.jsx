import TaskItem from "./tareaIndividual";

function TaskColumn({ title, tasks, onStatusChange, onEdit, onDelete }) {
  return (
    <section>
      <h2>
        {title} ({tasks.length})
      </h2>
      {tasks.length === 0 ? (
        <p>No hay tareas aquí</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskColumn;