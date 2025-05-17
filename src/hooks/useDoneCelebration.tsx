import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { doneTodoAtom } from '@atoms';

export const useDoneCelebration = () => {
  const [triggerCelebration, setTriggerCelebration] = useAtom(doneTodoAtom);

  useEffect(() => {
    if (triggerCelebration) {
      const timeout = setTimeout(() => {
        setTriggerCelebration(false);
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [triggerCelebration, setTriggerCelebration]);

  return triggerCelebration;
};
