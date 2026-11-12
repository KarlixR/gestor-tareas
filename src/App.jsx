import { useState } from "react";
import Login from "./paginas/login";
import Register from "./paginas/registro";
import Tasks from "./paginas/tareas";
import { getCurrentUser, logout } from "./servicios/autenticacion";

function App() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [view, setView] = useState("login");

  function handleLogout() {
    logout();
    setUser(null);
    setView("login");
  }

  if (user) {
    return <Tasks user={user} onLogout={handleLogout} />;
  }

  return view === "login" ? (
    <Login onLogin={setUser} goToRegister={() => setView("register")} />
  ) : (
    <Register onLogin={setUser} goToLogin={() => setView("login")} />
  );
}

export default App;