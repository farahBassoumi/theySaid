import React from 'react';
import { motion } from 'framer-motion';
import { Status, Tag, Todo } from '@models';
import { deleteTodo, updateTodo } from '@/services';
import { doneTodoAtom, todosAtom } from '@/store/atoms/todosAtom';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import { DeleteLottie, TagLottie } from './ui-elements/Lotties';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const setTodos = useSetAtom(todosAtom);
  const { t } = useTranslation();
  const setDoneTodoAtom = useSetAtom(doneTodoAtom);

  const statusCycle = [Status.Pending, Status.InProgress, Status.Done];
  const tagCycle = [Tag.Life, Tag.Personal, Tag.Work];

  const onDelete = async () => {
    const currentTodo = todo;
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== currentTodo.id));
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setTodos((prevTodos) => [...prevTodos, currentTodo]);
    }
  };

  const onBlobClick = (tag: Tag) => {
    const currentIndex = tagCycle.indexOf(tag);
    const nextTag = tagCycle[(currentIndex + 1) % tagCycle.length];
    handleChange('tag', nextTag);
  };

  const handleChange = async (field: keyof Todo, value: string) => {
    const currentTodo = { ...todo };
    const updatedTodo = { ...todo, [field]: value };
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );

    try {
      await updateTodo(updatedTodo);
      if (field === 'status' && value === Status.Done) {
        setDoneTodoAtom(true);
        console.log('Todo marked as done:', updatedTodo);
      } else setDoneTodoAtom(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? currentTodo : t))
      );
    }
  };

  return (
    <div className="flex md:flex-row flex-col  md:gap-4 items-center justify-between px-4 lg:py-1 py-2 transition-all focus:outline-none">
      <span
        className={`text-md flex items-center w-full font-medium transition-all overflow-auto ${
          todo.status === Status.Done
            ? 'line-through text-main-light'
            : 'text-gray-800'
        }`}
      >
        {todo.title}
      </span>

      <div className="flex flex-row md:gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 600 }}
          onClick={() => {
            const currentIndex = statusCycle.indexOf(todo.status);
            const nextStatus =
              statusCycle[(currentIndex + 1) % statusCycle.length];
            handleChange('status', nextStatus);
          }}
          className="px-2 text-[12px] md:text-sm flex items-center justify-center w-[80px] md:w-[100px] focus:outline-none"
        >
          <motion.span
            whileTap={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            {t(`status.${todo.status}`)}
          </motion.span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 1.1 }}
          whileHover={{
            scale: 1.15,
            transition: { type: 'spring', stiffness: 900, bounce: 2 },
          }}
          onClick={() => onBlobClick(todo.tag)}
          className="flex justify-center items-center md:w-12 w-8 md:h-12 h-8 focus:outline-none"
        >
          <TagLottie tag={todo.tag} />
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.15,
            transition: { type: 'spring', stiffness: 800, bounce: 4 },
          }}
          whileTap={{
            scale: 0.75,
            transition: { type: 'spring', stiffness: 1500, bounce: 8 },
          }}
          transition={{ type: 'spring', bounce: 4, stiffness: 600 }}
          onClick={onDelete}
          className="focus:outline-none"
        >
          <div className="md:w-10 md:h-10 w-8 h-8">
            <DeleteLottie />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default TodoItem;
