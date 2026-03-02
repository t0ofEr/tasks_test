import React, { useState } from "react";

const Login = ({ onLogin, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onLogin(username, password);
    if (!result.success) {
      alert(result.msg || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-card app-container">
      <h2 style={{ textAlign: "center" }}>✨ Task Manager</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
        Bienvenido, por favor inicia sesión
      </p>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
          className="btn-primary" 
          type="submit" 
          disabled={loading}
          style={{ marginTop: "10px" }}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;