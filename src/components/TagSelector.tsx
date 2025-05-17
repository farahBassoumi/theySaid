import { Tag, tagColorMap } from '@models';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface TagSelectorProps {
  currentTag: Tag;
  onChange: (tag: Tag) => void;
}

const tagCycle = [Tag.Personal, Tag.Work, Tag.Life];

export default function TagSelector({ currentTag, onChange }: TagSelectorProps) {
  const { t } = useTranslation();

  const handleClick = () => {
    const currentIndex = tagCycle.indexOf(currentTag);
    const nextTag = tagCycle[(currentIndex + 1) % tagCycle.length];
    onChange(nextTag);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="w-full"
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 20,
        bounce: 2,
        delay: 0.4,
      }}
    >
      <motion.button
        type="button"
        whileTap={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 600 }}
        onClick={handleClick}
        className={`
          w-full px-4 py-2 rounded-[50px] border border-gray-300 
          focus:outline-none text-sm shadow-inner 
          ${tagColorMap[currentTag]}
        `}
      >
        <motion.span
          whileTap={{ scale: 1.3 }}
          transition={{ type: 'spring', stiffness: 500 }}
          className="inline-block"
        >
          {t(currentTag)}
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
