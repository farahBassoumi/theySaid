import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
interface DeleteButtonProps {
  deleteAll: () => void;
}

export default function DeleteButton({ deleteAll }: DeleteButtonProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      layout
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="w-full justify-center flex"
    >
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.15)',
          letterSpacing: '2px',
        }}
        transition={{ type: 'spring', stiffness: 600 }}
        whileTap={{ scale: 0.95 }}
        onClick={deleteAll}
        className=" bg-main hover:bg-main-dark w-full max-w-[300px] md:max-w-[500px] lg:max-w-[600px] text-mainBg-light px-4 py-2 rounded-[50px]"
      >
        {t('inputs.delete_all')}
      </motion.button>
    </motion.div>
  );
}
