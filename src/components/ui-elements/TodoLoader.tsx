import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

const TodoLoader = () => (
  <motion.div
    className="flex justify-center items-center"
    initial={{ opacity: 0, y: 100, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      type: 'spring',
      stiffness: 600,
      damping: 50,
      bounce: 2,
      delay: 0.5,
    }}
  >
    <DotLottieReact
      src="https://lottie.host/7e79a61f-fc3b-4b4a-a780-58092af42fa9/5lvmMMsnfs.lottie"
      loop
      autoplay
      style={{ width: 250, height: 250 }}
    />
  </motion.div>
);

export default TodoLoader;
