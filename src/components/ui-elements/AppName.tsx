import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';


export default function AppName() {
  const { t } = useTranslation();

  return (
    <motion.div
        className="text-[40px] md:text-[45px] lg:text-[50px] font-extrabold font-bold tracking-wide text-main cursor-default drop-shadow-md"
        style={{ textShadow: '2px 2px 4px rgba(0, 41, 77, 0.6)' }}
        initial={{ opacity: 0.5, scale: 0 }}
        animate={{ opacity: 1, scale: 1.5 }}
        whileHover={{
          scale: 1.8,
          textShadow: '4px 4px 8px rgba(0, 41, 77, 0.6)',
          transition: { bounce: 4, stiffness: 500, type: 'spring' },
        }}
      >
        {t('do_it_!')}
      </motion.div>
  );
}
