import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import { useCallback } from 'react';

import {
  newTodoAtom,
  todosAtom,
  todosLoadingAtom,
} from '@/store/atoms/todosAtom';
import { createTodo, deleteAllTodos } from '@/services';
import { Status, CreateTodoParams } from '@models';

import {
  AppName,
  TodoItem,
  DeleteTodoButton,
  AddTodoButton,
  TagSelector,
  TodoLoader,
} from '@components';

export function TodoHome() {
  const { t } = useTranslation();
  const [todos, setTodos] = useAtom(todosAtom);
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const isTodosLoading = useAtomValue(todosLoadingAtom);

  const handleChange = useCallback(
    (field: keyof CreateTodoParams, value: string) => {
      setNewTodo((prev) => ({ ...prev, [field]: value }));
    },
    [setNewTodo]
  );

  const addTodo = useCallback(async () => {
    const title = newTodo.title.trim();

    if (!title) return;

    const isDuplicate = todos.some(
      (t) =>
        t.title.trim().toLowerCase() === title.toLowerCase() &&
        t.tag === newTodo.tag
    );

    if (isDuplicate) {
      console.warn('Todo with this title already exists.');
      return;
    }

    try {
      const addedTodo = await createTodo(newTodo);
      setTodos((prev) => [addedTodo, ...prev]);
      setNewTodo({ title: '', tag: newTodo.tag, status: Status.Pending });
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }, [newTodo, todos, setTodos, setNewTodo]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo();
  };

  const deleteAll = useCallback(async () => {
    const prevTodos = todos;
    setTodos([]);
    try {
      await deleteAllTodos();
    } catch (error) {
      setTodos(prevTodos);
      console.error('Failed to delete all todos:', error);
    }
  }, [todos, setTodos]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 py-4 flex flex-col items-center font-josefin rounded-[50px] gap-10 text-gray-600"
    >
      <AppName />

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 20,
          bounce: 0.4,
        }}
        className="w-screen flex flex-col lg:flex-row justify-center gap-[20px]
                   bg-white bg-opacity-40 backdrop-blur-lg
                   shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                   py-4 px-10 md:py-6 md:px-8 lg:px-20 lg:py-10
                   rounded-2xl transition-shadow duration-500 ease-in-out"
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 800,
            damping: 20,
            bounce: 2,
            delay: 0.2,
          }}
          className="flex justify-center w-full"
        >
          <input
            type="text"
            placeholder={t('inputs.add_a_new_todo')}
            value={newTodo.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-1.5 w-[200px] md:w-[400px] lg:w-[500px]
                       border border-mainBg-dark rounded-[50px]
                       focus:outline-none focus:ring-2 focus:ring-mainBg
                       shadow-inner bg-white transition-all"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row w-full gap-3 items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <TagSelector
              currentTag={newTodo.tag}
              onChange={(tag) => handleChange('tag', tag)}
            />
          </div>
          <AddTodoButton addTodo={addTodo} />
        </div>
      </motion.div>

      {isTodosLoading ? (
        <TodoLoader />
      ) : (
        <div className="w-full p-4 md:p-6 lg:px-[100px] flex flex-col items-center justify-center gap-4">
          <motion.ul
            layout
            className="w-full overflow-hidden flex flex-col justify-center"
          >
            {todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem todo={todo} />
              </li>
            ))}
          </motion.ul>
          {todos.length > 0 && <DeleteTodoButton deleteAll={deleteAll} />}
        </div>
      )}
    </motion.div>
  );
}

export default TodoHome;
