

import express, { json } from 'express';
const app = express();
import cors from 'cors';
app.use(cors());
app.use(json());

let todos = [
  { id: 1, title: '', completed: true },

];

// GET todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = todos.find(todo => todo.id === parseInt(id));
  if (updatedTodo) {
    updatedTodo.title = req.body.title || updatedTodo.title;
    updatedTodo.completed = req.body.completed !== undefined ? req.body.completed : updatedTodo.completed;
    res.json(updatedTodo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.status(204).send();
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
