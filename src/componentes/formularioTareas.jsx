import { useState } from "react";

function TaskForm({ onAdd, initialData, onCancel }) {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [priority, setPriority] = useState(initialData?.priority || "media");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ title, description, dueDate, priority });

    if (!isEditing) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("media");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar tarea" : "Nueva tarea"}</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="baja">Prioridad baja</option>
        <option value="media">Prioridad media</option>
        <option value="alta">Prioridad alta</option>
      </select>
      <button type="submit">
        {isEditing ? "Guardar cambios" : "Agregar tarea"}
      </button>
      {isEditing && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default TaskForm;