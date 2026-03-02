import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Nuevo estado para el cargando
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:8000/api/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciamos carga
    try {
      const response = await fetch(`${API_BASE}login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        setToken(data.access);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Finalizamos carga
    }
  };

  const fetchTasks = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE}tasks/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (Array.isArray(data)) setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}tasks/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        setTitle('');
        setDescription('');
        fetchTasks();
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
  };

  useEffect(() => { fetchTasks(); }, [token]);

  // --- ESTILOS ---
  const styles = {
    container: { maxWidth: '500px', margin: '50px auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
    input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.3s' },
    taskCard: { backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginBottom: '10px', borderLeft: '5px solid #4A90E2', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    badge: { backgroundColor: '#e1f5fe', color: '#0288d1', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
    logoutBtn: { float: 'right', backgroundColor: '#ffeded', color: '#ff4d4d', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }
  };

  // VISTA LOGIN
  if (!token) {
    return (
      <div style={styles.container}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>✨ Task Manager</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>Ingresa tus credenciales</p>
        <form onSubmit={handleLogin}>
          <input style={styles.input} placeholder="Usuario" onChange={e => setUsername(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
          <button style={{...styles.button, opacity: loading ? 0.7 : 1}} type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    );
  }

  // VISTA TAREAS
  return (
    <div style={styles.container}>
      <button style={styles.logoutBtn} onClick={logout}>Cerrar Sesión</button>
      <h2 style={{ color: '#333' }}>Mis Tareas 📝</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input style={styles.input} placeholder="¿Qué hay que hacer?" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea style={{...styles.input, height: '80px'}} placeholder="Detalles (opcional)" value={description} onChange={e => setDescription(e.target.value)} />
        <button style={{...styles.button, backgroundColor: '#2ecc71'}} type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Añadir Tarea'}
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {tasks.map(t => (
          <div key={t.id} style={styles.taskCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{t.title}</strong>
              <span style={styles.badge}>{t.category}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>{t.description}</p>
            <small style={{ color: '#999' }}>👤 Creado por: {t.user || 'Tí'}</small>
          </div>
        ))}
        {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No tienes tareas pendientes.</p>}
      </div>
    </div>
  );
}

export default App;