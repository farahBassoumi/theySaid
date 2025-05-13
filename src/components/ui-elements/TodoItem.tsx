import React from 'react';
import Checkmark from './Checkmark';
import { Todo } from '@models';

interface TodoItemProps {
 todo:Todo;
  onCheck: (id: number) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({
todo,
  onCheck,
}) => {
  return (
    <li key={todo.id} className="p-3 flex items-center space-x-2">
      <div className="check-container" onClick={() => onCheck(todo.id)}>
        <Checkmark isChecked={todo.isChecked} />
      </div>
      <span>{todo.title}</span>
    </li>
  );
};

export default TodoItem;
