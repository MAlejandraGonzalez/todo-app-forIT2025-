import React, { useEffect, useState } from "react";
import TaskList from "./components/Tasklist";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const handleCreate = async (newTask) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTaskToEdit(null);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <TaskForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        taskToEdit={taskToEdit}
      />
      <TaskList
        tasks={tasks}
        onEdit={(task) => setTaskToEdit(task)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

