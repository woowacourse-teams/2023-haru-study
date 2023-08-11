import { useEffect } from 'react';

const usePreventScroll = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);
};

export default usePreventScroll;
