import { CreateTodoParams, Status, Tag, Todo } from '@models';

const STORAGE_KEY = 'todos';

const getStoredTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse stored todos:', error);
    return [];
  }
};

const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const fetchTodos = async (): Promise<Todo[]> => {
  return getStoredTodos().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createTodo = async (params: CreateTodoParams): Promise<Todo> => {
  const todos = getStoredTodos();

  const newTodo: Todo = {
    id: crypto.randomUUID?.() ?? Date.now().toString(), // more robust ID
    createdAt: new Date(),
    ...params,
  };

  const updatedTodos = [newTodo, ...todos];
  saveTodos(updatedTodos);

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
  const updatedTodos = getStoredTodos().filter((todo) => todo.id !== id);
  saveTodos(updatedTodos);
  return true;
};

export const deleteAllTodos = async (): Promise<boolean> => {
  saveTodos([]);
  return true;
};
