import { ChangeEvent, MouseEvent, useCallback, useState } from 'react';

const useStudyMaking = () => {
  const [studyName, setStudyName] = useState<string | null>(null);
  const [totalCycle, setTotalCycle] = useState<number | null>(null);
  const [timePerCycle, setTimePerCycle] = useState<number | null>(null);
  const [isInputValidate, setIsInputValidate] = useState<boolean>(false);

  const handleOnChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value.length < 1 || value.length > 10) {
        return setIsInputValidate(true);
      }

      setStudyName(e.target.value);
      setIsInputValidate(false);
    },
    [setStudyName],
  );

  const handleOnTotalCycleChange = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if ('dataset' in e.target) {
        const value = (e.target.dataset as { value: string }).value;

        setTotalCycle(Number(value));
      }
    },
    [setTotalCycle],
  );

  const handleOnTimePerCycleChange = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if ('dataset' in e.target) {
        const value = (e.target.dataset as { value: string }).value;

        setTimePerCycle(Number(value));
      }
    },
    [setTimePerCycle],
  );

  const isDisabled = () => {
    if (!studyName || !totalCycle || !timePerCycle) return true;
    if (studyName.length < 1 || studyName.length > 10) return true;
    if (isInputValidate) return true;

    return false;
  };

  return {
    isDisabled,
    studyName,
    totalCycle,
    timePerCycle,
    isInputValidate,
    handleOnChangeInput,
    handleOnTimePerCycleChange,
    handleOnTotalCycleChange,
  };
};

export default useStudyMaking;
