import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8000/api/tasks/';

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error("Error al crear:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#333' }}>Gestor de Tareas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required /><br />
        <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} /><br />
        <button type="submit" disabled={loading}>{loading ? 'Procesando...' : 'Crear'}</button>
      </form>
      {tasks.map(t => (
        <div key={t.id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
          <strong>{t.title}</strong> <span style={{ fontSize: '0.8em', color: 'blue' }}>[{t.category}]</span>
          <ul>{t.subtasks?.map(s => <li key={s.id}>{s.title}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export default App;