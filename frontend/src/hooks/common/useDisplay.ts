import { useState } from 'react';

const useDisplay = () => {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const hide = () => setIsShow(false);
  const toggleShow = () => setIsShow((prev) => !prev);

  return { isShow, show, hide, toggleShow };
};

export default useDisplay;
