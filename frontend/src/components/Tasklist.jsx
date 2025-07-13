// src/components/TaskList.jsx


// src/components/TaskList.jsx

import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
