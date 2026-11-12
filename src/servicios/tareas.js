const TASKS_KEY = "tasks";

function readAll() {
  return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
}

function saveAll(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function getTasks(userId) {
  return readAll().filter((t) => t.userId === userId);
}

export function addTask(userId, { title, description, dueDate, priority }) {
  const newTask = {
    id: Date.now(),
    userId,
    title: title.trim(),
    description: description.trim(),
    dueDate,
    priority,
    status: "pendiente",
  };
  saveAll([...readAll(), newTask]);
  return newTask;
}

export function updateTaskStatus(taskId, status) {
  const updated = readAll().map((t) =>
    t.id === taskId ? { ...t, status } : t
  );
  saveAll(updated);
}

export function updateTask(taskId, { title, description, dueDate, priority }) {
  const updated = readAll().map((t) =>
    t.id === taskId
      ? {
          ...t,
          title: title.trim(),
          description: description.trim(),
          dueDate,
          priority,
        }
      : t
  );
  saveAll(updated);
}

export function deleteTask(taskId) {
  saveAll(readAll().filter((t) => t.id !== taskId));
}