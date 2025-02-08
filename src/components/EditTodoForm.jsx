import React, { useState } from "react";

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="TextInput-Button">
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="todo-edit-input"
            placeholder="Update Task"
          />
        </div>
        <div className="todo-btn-div">
          <button type="submit" className="todo-btn">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTodoForm;
