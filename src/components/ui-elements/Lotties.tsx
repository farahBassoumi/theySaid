import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { lifeBlob, personalBlob, workBlob, deleteAnimation } from '@lotties';
import { useRef } from 'react';
import { Tag } from '@models';

export const DeleteLottie = () => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const handleMouseEnter = () => {
    lottieRef.current?.goToAndPlay(0, true);
  };

  return (
    <div onMouseEnter={handleMouseEnter} className="w-full h-full">
      <Lottie
        lottieRef={lottieRef}
        animationData={deleteAnimation}
        loop={false}
        autoplay={false}
        className="w-full h-full"
      />
    </div>
  );
};

export const TagLottie = ({ tag }: { tag: Tag }) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const tagAnimationMap = {
    work: workBlob,
    personal: personalBlob,
    life: lifeBlob,
  };

  const handleMouseEnter = () => {
    lottieRef.current?.setSpeed(6);
  };

  const handleMouseLeave = () => {
    lottieRef.current?.setSpeed(2);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={tagAnimationMap[tag]}
        loop
        autoplay
        className="w-full h-full"
      />
    </div>
  );
};
