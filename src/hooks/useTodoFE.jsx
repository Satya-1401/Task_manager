import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const useTodoFE = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState(0);

  const completedTodosCount = () => {
    const count = todos.filter((todo) => todo.completed).length;
    setCompletedTodos(count);
  };

  useEffect(() => {
    completedTodosCount();
  }, [todos]);

  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

  return {
    addTodo,
    deleteTodo,
    editTodo,
    toggleComplete,
    editTask,
    todos,
    completedTodos,
  };
};

export default useTodoFE;
