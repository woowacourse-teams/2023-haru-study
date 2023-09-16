import useInput from '@Hooks/common/useInput';
import useSelect from '@Hooks/common/useSelect';

import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

const ADDITIONAL_TIME = 20 as const;
const DIVIDE_TIME = 60 as const;

const useCreateStudyForm = () => {
  const studyNameInput = useInput(true);
  const timePerCycleSelect = useSelect<StudyTimePerCycleOptions>();
  const totalCycleSelect = useSelect<TotalCycleOptions>();

  const totalTime = (Number(timePerCycleSelect.state ?? 0) + ADDITIONAL_TIME) * Number(totalCycleSelect.state ?? 0);
  const hour = Math.floor(totalTime / DIVIDE_TIME);
  const minute = totalTime % DIVIDE_TIME;

  const isSelectedOptions = timePerCycleSelect.state && totalCycleSelect.state;

  const isDisabled = () => {
    if (!studyNameInput.state || !timePerCycleSelect.state || !totalCycleSelect.state) return true;
    if ((studyNameInput.state ?? '').length < 1 || (studyNameInput.state ?? '').length > 10) return true;
    if (studyNameInput.isInputError) return true;

    return false;
  };

  return {
    studyName: studyNameInput.state ?? '',
    changeStudyName: studyNameInput.onChangeInput,
    isStudyNameError: studyNameInput.isInputError,
    timePerCycle: timePerCycleSelect.state,
    changeTimePerCycle: timePerCycleSelect.onChangeSelectItem,
    totalCycle: totalCycleSelect.state,
    changeTotalCycle: totalCycleSelect.onChangeSelectItem,
    hour,
    minute,
    isSelectedOptions,
    isDisabled,
  };
};

export default useCreateStudyForm;
