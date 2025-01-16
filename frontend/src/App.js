import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(null); // For tracking which todo is being edited
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await axios.post("http://localhost:5000/api/todos", { title });
    setTodos([...todos, res.data]);
    setTitle("");
  };

  const updateTodo = async (id, newTitle) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { title: newTitle });
    setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
    setEditing(null); // Stop editing
    setEditTitle(""); // Clear edit input
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for Enter key press
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editing === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateTodo(todo.id, editTitle);
                  }}
                />
                <button onClick={() => updateTodo(todo.id, editTitle)}>Save</button>
              </div>
            ) : (
              <div>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title} {/* Only render the title */}
                </span>
                <button onClick={() => {
                  setEditing(todo.id); // Set editing mode
                  setEditTitle(todo.title); // Pre-fill edit field with current title
                }}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
