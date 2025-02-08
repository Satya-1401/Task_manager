import React from "react";
import "./TodoWrapper.css";
import TodoForm from "./TodoForm";
import DarkMode from "./../common/DarkMode/DarkMode";
import useTodo from "../hooks/useTodo";
import StyledTextValue from "../common/StyledTextValue/StyledTextValue";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";

const TodoWrapper = () => {
  const {
    addTodo,
    deleteTodo,
    editTodo,
    toggleComplete,
    editTask,
    todos,
    completedTodos,
  } = useTodo();

  return (
    <>
      <div className="TodoWrapper">
        <h1>Task Manager</h1>

        <div className="todo-header">
          <DarkMode />
        </div>

        <div className="todo-header-text">
          <StyledTextValue text="Total Tasks" count={todos.length} />
          <StyledTextValue text="Completed" count={completedTodos} />
          <StyledTextValue text="Pending" count={todos.length - completedTodos}/>
        </div>

        <TodoForm addTodo={addTodo} />
      </div>

      <div className="todo-cards">
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm key={todo.id} task={todo} editTodo={editTask} />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )}
      </div>
    </>
  );
};

export default TodoWrapper;
