import React from "react"
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo';
import '@testing-library/jest-dom'; 



const mockToggleComplete = jest.fn();
const mockDeleteTodo = jest.fn();
const mockEditTodo = jest.fn();


describe('Todo Component', () => {
  const mockTask = {
    id: 1,
    task: 'Task1',
    completed: false
  };

  test('renders the Todo component', () => {
    render(
      <Todo
        task={mockTask}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    const todoText = screen.getByText('Task1')
    expect(todoText).toBeTruthy();
  });

  test('renders a truncated task if the task is too long', () => {
    const longTask = {
      ...mockTask,
      task: 'This is a very long task'
    };

    render(
      <Todo
        task={longTask}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    const todoText = screen.getByText('This is a ...')
    expect(todoText).toBeTruthy();
  });

  test('toggles task visibility when eye icon is clicked', () => {
    const longTask = {
        ...mockTask,
        task: 'This is a very long task'
      };
    render(
      <Todo
        task={longTask}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    const todoText = screen.getByText('This is a ...')
    expect(todoText).toBeTruthy();

    fireEvent.click(screen.getByTestId('eye-icon'));
    expect(screen.getByText(longTask.task)).toBeTruthy();

    fireEvent.click(screen.getByTestId('eye-slash-icon'));
    expect(screen.getByText('This is a ...')).toBeTruthy();
  });

  test('calls toggleComplete when task is clicked', () => {
    render(
      <Todo
        task={mockTask}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        />
    );

    fireEvent.click(screen.getByText(mockTask.task));
    expect(mockToggleComplete).toHaveBeenCalledWith(mockTask.id);
  });

  test('calls editTodo when the edit icon is clicked', () => {
    render(
      <Todo
      task={mockTask}
      toggleComplete={mockToggleComplete}
      deleteTodo={mockDeleteTodo}
      editTodo={mockEditTodo}
      />
    );

    fireEvent.click(screen.getByTestId('edit-icon'));
    expect(mockEditTodo).toHaveBeenCalledWith(mockTask.id);
  });

  test('calls deleteTodo when the delete icon is clicked', () => {
    render(
      <Todo
      task={mockTask}
      toggleComplete={mockToggleComplete}
      deleteTodo={mockDeleteTodo}
      editTodo={mockEditTodo}
      />
    );

    fireEvent.click(screen.getByTestId('trash-icon'));
    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTask.id);
  });

  test('toggles the className when task is clicked to mark as completed or not', () => {
    const mockTask = {
      id: 1,
      task: 'Task2',
      completed: false,
    };

    const mockToggleComplete = jest.fn();

    const { rerender } = render(
      <Todo
        task={mockTask}
        toggleComplete={mockToggleComplete}
        deleteTodo={() => {}}
        editTodo={() => {}}
      />
    );

    const taskElement = screen.getByText('Task2');
    expect(taskElement).toHaveClass('notcompleted');

    fireEvent.click(taskElement);
    expect(mockToggleComplete).toHaveBeenCalledWith(mockTask.id);

    mockTask.completed = true;
    rerender(
      <Todo
        task={mockTask}
        toggleComplete={mockToggleComplete}
        deleteTodo={() => {}}
        editTodo={() => {}}
      />
    );

    const updatedTaskElement = screen.getByText('Task2');
    expect(updatedTaskElement).toHaveClass('completed');
  });
  
});
