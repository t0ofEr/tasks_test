import React, { useState } from "react";
import { taskApi } from "../api/taskApi";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await taskApi.createTask(title, description);
      if (response.ok) {
        setTitle("");
        setDescription("");
        onTaskCreated(); // Recarga la lista en el componente padre
      } else {
        alert("Error al crear la tarea");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <input
        className="input-field"
        placeholder="¿Cuál es la tarea principal?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="input-field"
        style={{ height: "80px", resize: "none" }}
        placeholder="Añade una descripción..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button 
        className="btn-primary" 
        style={{ backgroundColor: "#2ecc71" }} 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Generando pasos con IA..." : "Añadir Tarea"}
      </button>
    </form>
  );
};

export default TaskForm;