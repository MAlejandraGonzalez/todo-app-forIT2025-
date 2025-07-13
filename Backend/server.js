const express = require("express");
const cors = require("cors");  

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Array en memoria
let tasks = [
  { id: 1, title: "Aprender React", completed: false },
  { id: 2, title: "Hacer el challenge", completed: true }
];
let idCounter = 3;

// GET /api/tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const newTask = {
    id: idCounter++,
    title,
    description,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.completed = completed ?? task.completed;

  res.json(task);
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

// Iniciar servidor (solo una vez)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
