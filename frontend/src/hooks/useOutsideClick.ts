import { useEffect, useRef } from 'react';

const useOutsideClick = <T extends HTMLElement>(onClickOutside: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClickOutside, ref]);

  return ref;
};

export default useOutsideClick;
