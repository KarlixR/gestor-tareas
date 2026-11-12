const USERS_KEY = "users";
const SESSION_KEY = "currentUser";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function register(name, email, password) {
  const users = getUsers();
  const emailNormalizado = email.trim().toLowerCase();

  if (users.some((u) => u.email === emailNormalizado)) {
    return { ok: false, error: "Ya existe una cuenta con ese correo" };
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: emailNormalizado,
    password,
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return { ok: true };
}

export function login(email, password) {
  const user = getUsers().find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return { ok: false, error: "Correo o contraseña incorrectos" };
  }

  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user: session };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}