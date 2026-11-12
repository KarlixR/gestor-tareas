function TaskFilters({ filters, onChange }) {
  function handleChange(e) {
    onChange({ ...filters, [e.target.name]: e.target.value });
  }

  function handleClear() {
    onChange({ search: "", status: "todos", priority: "todas" });
  }

  return (
    <div className="filters">
      <h2>Buscar y filtrar</h2>
      <input
        type="text"
        name="search"
        placeholder="Buscar por título o descripción"
        value={filters.search}
        onChange={handleChange}
      />
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="todos">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
      >
        <option value="todas">Todas las prioridades</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <button type="button" onClick={handleClear}>
        Limpiar filtros
      </button>
    </div>
  );
}

export default TaskFilters;