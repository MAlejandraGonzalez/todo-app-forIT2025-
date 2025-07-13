// src/components/TaskForm.jsx

import React, { useState, useEffect } from "react";

const TaskForm = ({ onCreate, onUpdate, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Completá ambos campos");
      return;
    }

    const task = { ...taskToEdit, title, description };

    if (taskToEdit) {
      onUpdate(task);
    } else {
      onCreate(task);
    }

    // Limpiar si es una nueva tarea
    if (!taskToEdit) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{taskToEdit ? "Editar tarea" : "Nueva tarea"}</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginTop: "10px" }}
      />
      <br />
      <button type="submit" style={{ marginTop: "10px" }}>
        {taskToEdit ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default TaskForm;
