import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
interface AddTodoButtonProps {
  addTodo: () => void;
}

export default function AddTodoButton({ addTodo }: AddTodoButtonProps) {
  const { t } = useTranslation();

  return (
    <motion.button
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 900,
      }}
      exit={{
        opacity: 0,
        y: -50,
        scale: 0.9,
      }}
      whileHover={{
        scale: 1.025,
        letterSpacing: '2px',
        transition: {
          type: 'spring',
          stiffness: 600,
          delay: 0,
        },
      }}
      whileTap={{
        scale: 1.1,
      }}
      onClick={addTodo}
      className="flex w-full max-h-[40px] items-center justify-center rounded-[50px] px-4 py-2 text-sm text-mainBg-light hover:bg-main-dark hover:text-white bg-main focus:outline-none"
      style={{
        boxShadow:
          'inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 6px rgba(45, 53, 0, 0.05)',
      }}
    >
      {t('inputs.add')}
    </motion.button>
  );
}
