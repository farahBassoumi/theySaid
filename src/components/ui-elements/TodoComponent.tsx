import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './TodoComponent.css';
import TodoItem from './TodoItem';
import NewTodoForm from './NewTodoForm';
import {
  fetchTodos,
  createTodo,
  CreateTodoParams,
  updateTodo,
} from '@/services';
import { Todo, Tag, Status } from '@models';

export function TodoComponent() {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<CreateTodoParams>({
    title: '',
    tag: Tag.Personal,
    status: Status.Pending,
  });
  const handleChange = (field: keyof CreateTodoParams, value: string) => {
    setNewTodo((prev) => ({ ...prev, [field]: value }));
  };

  async function getTodos() {
    try {
      const todos = await fetchTodos();
      setTodos(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.title.trim()) return;

    try {
      const addedTodo = await createTodo(newTodo);

      setTodos((prev) => [addedTodo, ...prev]);
      setNewTodo({
        title: '',
        tag: Tag.Personal,
        status: Status.Pending,
      });
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleIsChecked = async (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    if (!currentTodo) return;

    const updatedTodo = { ...currentTodo, isChecked: !currentTodo.isChecked };

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );

    try {
      await updateTodo(updatedTodo);
    } catch (error) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? currentTodo : todo))
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div>
      <h1>{t('Todo')}</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} onCheck={toggleIsChecked} />
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          onChange={(e) => handleChange('title', e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={t('Add a new todo')}
          className="border p-2 mr-2"
        />

        <select
          value={newTodo.tag}
          onChange={(e) => handleChange('tag', e.target.value as Tag)}
        >
          {Object.values(Tag).map((tag) => (
            <option key={tag} value={tag}>
              {t(tag)}
            </option>
          ))}
        </select>
        <select
          value={newTodo.status}
          onChange={(e) => handleChange('status', e.target.value as Status)}
        >
          {Object.values(Status).map((status) => (
            <option key={status} value={status}>
              {t(status)}
            </option>
          ))}
        </select>

        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {t('Add')}
        </button>
      </div>{' '}
    </div>
  );
}

export default TodoComponent;
