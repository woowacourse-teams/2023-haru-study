import { useState } from 'react';

let idCounter = 0;

export const generateId = (prefix = 'haru-study-id') => {
  idCounter = idCounter + 1;
  return `${prefix}${idCounter}`;
};

const useId = (prefix?: string) => {
  const [id] = useState(() => {
    return generateId(prefix);
  });

  return id;
};

export default useId;
