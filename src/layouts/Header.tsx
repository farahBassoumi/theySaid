import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import { useDoneCelebration } from '@hooks';
import { translation, giraffe } from '@lotties';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const { i18n } = useTranslation();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const triggerCelebration = useDoneCelebration();

  const onChangeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <header className="pt-4 px-4 md:px-6 ms:pt-4 lg:px-8 lg:pt-6 flex justify-between">
      <div className="flex w-full items-center justify-center overflow-hidden h-[70px]">
        {triggerCelebration && (
          <Lottie
            lottieRef={lottieRef}
            animationData={giraffe}
            loop={false}
            autoplay
            className="w-full h-full"
          />
        )}
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 1.1 }}
        whileHover={{
          scale: 1.15,
          transition: { type: 'spring', stiffness: 600 },
        }}
        onClick={onChangeLanguage}
        className="sm:w-8 sm:h-8 md:w-10 md:h-10 w-12 h-12 focus:outline-none"
      >
        <Lottie
          animationData={translation}
          loop
          autoplay
          className="w-full h-full"
        />
      </motion.button>
    </header>
  );
};

export default Header;
