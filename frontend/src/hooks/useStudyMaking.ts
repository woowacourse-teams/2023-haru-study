import { ChangeEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setCookie } from '@Utils/cookie';

import { createStudy } from '@Apis/index';

const useStudyMaking = () => {
  const [studyName, setStudyName] = useState<string | null>(null);
  const [totalCycle, setTotalCycle] = useState<number | null>(null);
  const [timePerCycle, setTimePerCycle] = useState<number | null>(null);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const navigator = useNavigate();

  const handleOnChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (value.length < 1 || value.length > 10) {
        return setIsInputError(true);
      }

      setStudyName(e.target.value);
      setIsInputError(false);
    },
    [setStudyName],
  );

  const handleOnTotalCycleChange: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if ('dataset' in e.target) {
        const value = (e.target.dataset as { value: string }).value;

        setTotalCycle(Number(value));
      }
    },
    [setTotalCycle],
  );

  const handleOnTimePerCycleChange: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if ('dataset' in e.target) {
        const value = (e.target.dataset as { value: string }).value;

        setTimePerCycle(Number(value));
      }
    },
    [setTimePerCycle],
  );

  const handleOnClickMakeButton = async () => {
    const response = await createStudy(studyName, totalCycle, timePerCycle);

    const locationHeader = response.headers.get('Location');
    const studyId = locationHeader?.split('/').pop() as string;

    setCookie('studyId', studyId, 1);

    const result = (await response.json()) as { participantCode: string; studyName: string };

    navigator('/study-participating-host', { state: { participantCode: result.participantCode, studyName } });
  };

  const isDisabled = () => {
    if (!studyName || !totalCycle || !timePerCycle) return true;
    if (studyName.length < 1 || studyName.length > 10) return true;
    if (isInputError) return true;

    return false;
  };

  return {
    isDisabled,
    totalCycle,
    timePerCycle,
    isInputError,
    handleOnChangeInput,
    handleOnTimePerCycleChange,
    handleOnTotalCycleChange,
    handleOnClickMakeButton,
  };
};

export default useStudyMaking;
