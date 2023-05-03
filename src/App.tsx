import React, { useState } from "react";
import './App.css';

export default function App() {
  const [todos, setToDos] = useState([]);
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState('');
  const [completed, setCompleted] = useState([]);

  const addToDo = () => {
    if (!description.trim()) {
      return; // return early if description is empty or only contains whitespace
    }
    if (isEditing) {
      todos[editIndex].description = description;
      setToDos([...todos]);
    } else {
      const toDoListItem = {
        description: description,
      }
      setToDos([...todos, toDoListItem]);
    }

    setDescription('');
    setIsEditing(false);
  }

  const editCompleted = (index) => {
    setCompleted(completed.includes(index) ? completed.filter(i => i !== index) : [...completed, index])
  }

  const editToDo = (index) => {
    const toDoToEdit = todos[index];
    setDescription(toDoToEdit.description);
    setIsEditing(true);
    setEditIndex(index);
  }

  const deleteToDo = (index) => {
    const newToDos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setToDos(newToDos);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addToDo();
    }
  }

  return (
    <div className="App">
      <header><h2>To Do List</h2></header>
      
      <main>

        <div className="add-item">
          <label className="label">Description:</label>
          <input 
            className="input"
            type="text" 
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Enter Task..."
          />
          <button className="add-btn" onClick={addToDo}>➕</button>
        </div>

        <div className="item-list">
          {todos.map((todo, index) => (
            <div className="single-item" key={index}>
              <span className={completed.includes(index) ? "item-description completed" : "item-description"}>{todo.description}</span>
              <button className="item-list-btn" onClick={() => editCompleted(index)}>✔️</button>              
              <button className="item-list-btn" onClick={() => editToDo(index)}>✏️</button>              
              <button className="item-list-btn" onClick={() => deleteToDo(index)}>✖️</button>
            </div>
          ))}
        </div>

      </main>

      <footer><a href="https://youtu.be/jfUZTxTYZu0" target="_blank">Shaun Halverson</a></footer>
    </div>
  ) 
}