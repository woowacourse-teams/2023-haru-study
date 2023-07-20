import { ChangeEventHandler, useCallback, useState } from 'react';

const useHostParticipationInfo = () => {
  const [nickName, setNickName] = useState<string | null>(null);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const handleOnChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (value.length < 1 || value.length > 10) {
        return setIsInputError(true);
      }

      setNickName(e.target.value);
      setIsInputError(false);
    },
    [setNickName],
  );

  return { nickName, isInputError, handleOnChangeInput };
};

export default useHostParticipationInfo;
