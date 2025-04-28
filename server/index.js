import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const tasksFile = join(__dirname, 'tasks.json');

// Ensure tasks.json exists
try {
  await fs.access(tasksFile);
} catch {
  await fs.writeFile(tasksFile, '[]');
}

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await fs.readFile(tasksFile, 'utf-8');
    res.json(JSON.parse(tasks));
  } catch (error) {
    res.status(500).json({ error: 'Error reading tasks' });
  }
});

// Add new task
app.post('/api/tasks', async (req, res) => {
  try {
    const tasks = JSON.parse(await fs.readFile(tasksFile, 'utf-8'));
    const newTask = {
      ...req.body,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const tasks = JSON.parse(await fs.readFile(tasksFile, 'utf-8'));
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const tasks = JSON.parse(await fs.readFile(tasksFile, 'utf-8'));
    const filteredTasks = tasks.filter(task => task.id !== req.params.id);
    await fs.writeFile(tasksFile, JSON.stringify(filteredTasks, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});