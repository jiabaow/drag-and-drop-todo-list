import {useState} from "react";
import { v4 as uuid } from "uuid";
import {DndContext} from "@dnd-kit/core";
import TaskColumn from "./TaskColumn.jsx";
import DropToDeleteArea from "./DropToDeleteArea.jsx";

const ToDoList = ({ todos: initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const updateTodoStatus = (draggedTodoId, droppedColumnTitle) => {
    const statusByColumn = {
      'To Do': 'to-do',
      'In Progress': 'in-progress',
      'Done': 'done',
    };

    setTodos(
        todos.map((todo) => {
          if (todo.id === draggedTodoId) {
            return {
              ...todo,
              status: statusByColumn[droppedColumnTitle],
            };
          } else {
            return todo;
          }
        })
    );
  };

  const deleteTodo = (draggedTodoId) => {
    setTodos(todos.filter((todo) => todo.id !== draggedTodoId));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }
    const draggedTodoId = active.id;
    const droppedAreaId = over.id;
    if (droppedAreaId === 'delete-task-area') {
      deleteTodo(active.id);
    } else {
      updateTodoStatus(draggedTodoId, droppedAreaId);
    }
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, {id: uuid, text: newTodoText, status: 'to-do'}]);
    setNewTodoText('');
  }

  return (
      <DndContext onDragEnd={handleDragEnd}>
        <h2 style={{ marginLeft: '10px' }}>To do list</h2>
        <form
          onSubmit={handleAddTodo}
          style={{ margin: '10px', display: 'flex', gap: '10px' }}
          >
          <input
              type="text"
              name="newTodoText"
              placeholder="type in your todo"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button type="submit">Add todo</button>
        </form>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TaskColumn
            title="To Do"
            todos={todos.filter((t) => t.status === 'to-do')}
          />
          <TaskColumn
            title="In Progress"
            todos={todos.filter((t) => t.status === 'in-progress')}
          />
          <TaskColumn
            title="Done"
            todos={todos.filter((t) => t.status === 'done')}
          />
        </div>
        <DropToDeleteArea />
      </DndContext>
  );
};

export default ToDoList;
