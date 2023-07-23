import { MouseEventHandler, useCallback, useState } from 'react';

const useSelect = () => {
  const [state, setState] = useState<string | null>(null);

  const onChangeSelectItem: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if ('dataset' in e.target) {
        const value = (e.target.dataset as { value: string }).value;

        setState(value);
      }
    },
    [setState],
  );

  return { state, onChangeSelectItem };
};

export default useSelect;
