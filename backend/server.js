import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

// Create an Express app
const app = express();

// Middleware for handling CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB connection URI (you can use dotenv to hide sensitive information)
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://haqshayan2:T1EALCzLW838iLwx@cluster0.ujafk.mongodb.net/todolist?retryWrites=true&w=majority';

// Create an async function to connect to MongoDB
const connectToDB = async () => {
  try {
    // Connect to MongoDB using mongoose
    await mongoose.connect(mongoURI);
    console.log('Database Connected Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Call the connect function
connectToDB();

// Sample Todo Schema and Model (MongoDB)
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// API Routes

// GET todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).send('Error fetching todos');
  }
});

// POST new todo
app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    completed: false,
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).send('Error creating todo');
  }
});

// PUT update todo
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(400).send('Error updating todo');
  }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (deletedTodo) {
      res.status(204).send();
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting todo');
  }
});

// Start the server
const port = 5005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
