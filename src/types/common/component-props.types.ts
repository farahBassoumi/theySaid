import { PropsWithChildren } from 'react';

export type ComponentProps<T = any> = PropsWithChildren<T> & {
  className?: string;
};
