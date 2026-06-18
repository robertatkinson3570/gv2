import { useCallback, MutableRefObject, DependencyList } from 'react';

interface Options {
  dependencies?: DependencyList;
  freeze?: boolean;
}

export const useIntersectionObserver = (ref: MutableRefObject<null | IntersectionObserver>, callback: () => void, options: Options) => {
  const callbackFunction = (node: Element | null) => {
    if (options.freeze) return;
    if (ref.current) ref.current.disconnect();

    ref.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (node) ref.current.observe(node);
  };

  return useCallback(callbackFunction, [options.dependencies ? [...options.dependencies] : undefined, options.freeze]);
};
