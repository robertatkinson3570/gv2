import { ReactPortal, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  target?: '#portal' | '#portal-tooltip';
  children: ReactNode;
}

export const Portal = ({ target = '#portal', children }: Props): ReactPortal | null => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.querySelector(target)) : null;
};
