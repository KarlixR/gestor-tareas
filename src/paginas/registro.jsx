import { useState } from "react";
import { register, login } from "../servicios/autenticacion";

function Register({ onLogin, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const result = register(name, email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    const session = login(email, password);
    onLogin(session.user);
  }

  return (
    <div className="auth">
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Registrarme</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <button onClick={goToLogin}>Inicia sesión</button>
      </p>
    </div>
  );
}

export default Register;