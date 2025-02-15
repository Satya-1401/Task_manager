import React, { useState } from "react";
import "./Todo.css";
// import { ReactSVG } from "react-svg";
import Eye from "../assets/eye.svg";
import EyeSlash from "../assets/eye-slash.svg";
import EditIcon from "../assets/editIcon.svg";
import TrashIcon from "../assets/trash.svg";

const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  const [showData, setShowData] = useState(false);

  const toggleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : "notcompleted"}`}
        onClick={() => toggleComplete(task.id)}
      >
        {showData
          ? task.task
          : task.task.length > 10
            ? `${task.task.slice(0, 10)}...`
            : task.task}
      </p>

      <div className="icons">
        {showData
          ? task.task.length > 10 && (
              <img
                src={EyeSlash}
                className="HideShowIcons"
                onClick={() => toggleShowData()}
                data-testid="eye-slash-icon"
              />
            )
          : task.task.length > 10 && (
              <img
                src={Eye}
                className="HideShowIcons"
                onClick={() => toggleShowData()}
                data-testid="eye-icon"
              />
            )}

        <img
          src={EditIcon}
          className="HideShowIcons"
          onClick={() => editTodo(task.id)}
          data-testid="edit-icon"
        />

        <img
          src={TrashIcon}
          className="HideShowIcons"
          onClick={() => deleteTodo(task.id)}
          data-testid="trash-icon"
        />
      </div>
    </div>
  );
};

export default Todo;
