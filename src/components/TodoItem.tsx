import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import { motion } from 'framer-motion';

import { Status, Tag, Todo } from '@models';
import { deleteTodo, updateTodo } from '@/services';
import { doneTodoAtom, todosAtom } from '@/store/atoms/todosAtom';

import { DeleteLottie, TagLottie } from './ui-elements/Lotties';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const setTodos = useSetAtom(todosAtom);
  const setDoneTodoAtom = useSetAtom(doneTodoAtom);
  const { t } = useTranslation();

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
      } else {
        setDoneTodoAtom(false);
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? currentTodo : t))
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-4 py-2 transition-all focus:outline-none md:flex-row lg:py-1">
      <span
        className={`flex w-full items-center overflow-auto text-md font-medium transition-all ${
          todo.status === Status.Done
            ? 'line-through text-main-light'
            : 'text-gray-800'
        }`}
      >
        {todo.title}
      </span>

      <div className="flex flex-row gap-3 md:gap-3">
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
          className="flex w-[80px] items-center justify-center px-2 text-[12px] focus:outline-none md:w-[100px] md:text-sm"
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
          className="flex h-8 w-8 items-center justify-center focus:outline-none md:h-12 md:w-12"
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
          <div className="h-8 w-8 md:h-10 md:w-10">
            <DeleteLottie />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default TodoItem;
