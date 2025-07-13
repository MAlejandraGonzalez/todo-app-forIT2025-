// src/components/TaskItem.jsx

import React from "react";

<div className="task-item">
  <div>
    <div className="task-title">{task.title}</div>
    <div>{task.description}</div>
  </div>
  <div className="task-buttons">
    <button onClick={() => onEdit(task)}>Editar</button>
    <button onClick={() => onDelete(task.id)}>Eliminar</button>
  </div>
</div>


export default TaskItem;


