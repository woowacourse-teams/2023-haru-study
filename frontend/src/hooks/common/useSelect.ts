import type { MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';

const useSelect = <T>() => {
  const [state, setState] = useState<T | null>(null);

  const onChangeSelectItem: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if ('dataset' in e.target) {
        const value = (e.target.dataset as { value: T }).value;

        setState(value);
      }
    },
    [setState],
  );

  return { state, onChangeSelectItem };
};

export default useSelect;
