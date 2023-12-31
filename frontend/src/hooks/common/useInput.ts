import type { ChangeEventHandler } from 'react';
import { useCallback, useState } from 'react';

const useInput = (validateOption: boolean) => {
  const [state, setInputState] = useState<string | null>(null);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (
        (validateOption && (value.length < 1 || value.length > 10)) ||
        (validateOption && value.trim().length === 0)
      ) {
        return setIsInputError(true);
      }

      setInputState(e.target.value);

      if (validateOption) {
        setIsInputError(false);
      }
    },
    [setInputState, validateOption],
  );

  return { state, isInputError, onChangeInput };
};

export default useInput;
