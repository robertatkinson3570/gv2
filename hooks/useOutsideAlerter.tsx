import React, { useEffect } from 'react';

export const useOutsideAlerter = (ref: React.RefObject<HTMLElement>, callback: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const insideContainer = ref.current;
      if (insideContainer && event.target instanceof Element && !insideContainer.contains(event.target)) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
