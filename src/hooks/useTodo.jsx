import React, { useEffect, useState } from "react";
import axios from "axios";

const BaseUrl = "http://localhost:8080";

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState(0);

  const completedTodosCount = () => {
    const count = todos.filter((todo) => todo.completed).length;
    setCompletedTodos(count);
  };

  const getTodos = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/todos`);
      setTodos(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  useEffect(() => {
    completedTodosCount();
  }, [todos]);

  useEffect(() => {
    getTodos();
  }, []);


  const addTodo = async (todo) => {
    try {
      const response = await axios.post(`${BaseUrl}/todos`, {
        task: todo,
        completed: false,
        isEditing: false,
      });
      setTodos([...todos, response.data]);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error adding the todo!", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/todos/${id}`);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error("There was an error adding the todo!", error);
    }
  };


  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };

      await axios.patch(`${BaseUrl}/todos/${id}`, updatedTodo);
      const newTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.error("There was an error adding the todo!", error);
    }
  };


  const editTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todo, isEditing: !todo.isEditing };

      await axios.patch(`${BaseUrl}/todos/${id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("There was an error editing the todo!", error);
    }
  };


  const editTask = async (task, id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todo, task, isEditing: !todo.isEditing };

      await axios.patch(`${BaseUrl}/todos/${id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("There was an error editing the task!", error);
    }
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

export default useTodo;
