import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const TodoLoader = () => (
  <div className="flex justify-center items-center">
    <DotLottieReact
      src="https://lottie.host/7e79a61f-fc3b-4b4a-a780-58092af42fa9/5lvmMMsnfs.lottie"
      loop
      autoplay
      style={{ width: 250, height: 250 }}
    />
  </div>
);

export default TodoLoader;
