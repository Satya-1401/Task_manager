import React from "react";
import "./StyledTextValue.css";

const StyledTextValue = ({ text, count }) => {
  return (
    <div className="todo-text">
      <h2>{text} </h2>
      <div className="todo-values">{count}</div>
    </div>
  );
};

export default StyledTextValue;
