import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]); // Manage task state

  // Function to add a task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to update a task
  const updateTask = (index) => {
    const updatedTasks = [...tasks];
    const newTask = prompt("Update Task:", updatedTasks[index]);
    if (newTask) updatedTasks[index] = newTask;
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
    </>
  );
}

export default App;
