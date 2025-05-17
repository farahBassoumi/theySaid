import { CreateTodoParams, Status, Tag, Todo } from '@models';

const STORAGE_KEY = 'todos';

const getStoredTodos = (): Todo[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const todos = getStoredTodos();
  return todos.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createTodo = async (params: CreateTodoParams): Promise<Todo> => {
  const todos = getStoredTodos();

  const newTodo: Todo = {
    id: todos.length.toString(),
    createdAt: new Date(),
    ...params,
  };

  todos.unshift(newTodo);
  saveTodos(todos);

  return newTodo;
};

export const updateTodo = async (updatedTodo: Todo): Promise<boolean> => {
  const todos = getStoredTodos();
  const index = todos.findIndex((todo) => todo.id === updatedTodo.id);

  if (index === -1) return false;

  todos[index] = { ...todos[index], ...updatedTodo };
  saveTodos(todos);

  return true;
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  const todos = getStoredTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);

  saveTodos(updatedTodos);
  return true;
};

export const deleteAllTodos = async (): Promise<boolean> => {
  saveTodos([]);
  return true;
};
