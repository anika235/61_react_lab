import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({ id: null, header: '', description: '' }); // State for editing task

  const addTask = (header, description) => {
    setTasks([...tasks, { id: tasks.length, header, description }]);
    setEditTask({ id: null, header: '', description: '' }); // Clear input fields after adding task
  };
  

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, header, description) => {
    setEditTask({ id, header, description });
  };

  const saveEdit = () => {
    if (editTask.id !== null && editTask.header.trim() !== '') {
      const updatedTasks = [...tasks];
      const taskIndex = updatedTasks.findIndex((task) => task.id === editTask.id);
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...editTask };
      setTasks(updatedTasks);
      setEditTask({ id: null, header: '', description: '' }); // Reset edit state after saving
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter task header"
            value={editTask.header || ''} // Pre-fill header with edit value if editing
            onChange={(e) => setEditTask({ ...editTask, header: e.target.value })}
          />
          <textarea

            className="form-control mb-2" // Add mb-2 class for margin-bottom
            placeholder="Enter task description"
            value={editTask.description || ''} // Pre-fill description with edit value if editing
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
          />

          {editTask.id === null ? ( // Conditionally render buttons based on edit state
            <button
              type="button"
              className="btn btn-primary float-end"
              onClick={() => addTask(editTask.header, editTask.description)} // Call addTask if not editing
            >
              
              Add New Task
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary float-end mx-1"
                onClick={saveEdit}
              >
                Save Edit
              </button>
              <button
                type="button"
                className="btn btn-danger float-end"
                onClick={() => setEditTask({ id: null, header: '', description: '' })} // Cancel editing
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <h5>{editTask.id === task.id ? <input type="text" value={editTask.header} onChange={(e) => handleEditTask(task.id, e.target.value, task.description)} /> : task.header}</h5> {/* Edit header if editing */}
            <p>{editTask.id === task.id ? <textarea value={editTask.description} onChange={(e) => handleEditTask(task.id, task.header, e.target.value)} /> : task.description}</p> {/* Edit description if editing */}
            <div className="float-end">
              <button
                type="button"
                className="btn btn-primary btn-sm mx-1"
                onClick={() => handleEditTask(task.id, task.header, task.description)} // Pre-fill edit state
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
