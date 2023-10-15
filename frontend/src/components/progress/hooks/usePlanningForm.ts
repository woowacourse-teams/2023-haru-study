import { useState } from 'react';

import useMutation from '@Hooks/api/useMutation';
import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { useParticipantInfo, useStudyInfo } from '@Contexts/StudyProgressProvider';

import { requestWritePlan } from '@Apis/index';

const usePlanningForm = () => {
  const { studyId } = useStudyInfo();
  const { participantId } = useParticipantInfo();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate: submitForm, isLoading: isSubmitLoading } = useMutation(
    () =>
      requestWritePlan(studyId, participantId, {
        toDo: questionTextareaProps.toDo.value,
        completionCondition: questionTextareaProps.completionCondition.value,
        expectedProbability: questionTextareaProps.expectedProbability.value,
        expectedDifficulty: questionTextareaProps.expectedDifficulty.value,
        whatCanYouDo: questionTextareaProps.whatCanYouDo.value,
      }),
    {
      onSuccess: () => setIsSubmitted(true),
    },
  );

  const questionTextareaProps = {
    toDo: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    completionCondition: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    expectedProbability: useQuestionTextarea({
      maxLength: 500,
    }),
    expectedDifficulty: useQuestionTextarea({
      maxLength: 500,
    }),
    whatCanYouDo: useQuestionTextarea({
      maxLength: 500,
    }),
  } as const;

  const isInvalidForm = !!(
    questionTextareaProps.toDo.errorMessage ||
    questionTextareaProps.completionCondition.errorMessage ||
    questionTextareaProps.expectedDifficulty.errorMessage ||
    questionTextareaProps.expectedProbability.errorMessage ||
    questionTextareaProps.whatCanYouDo.errorMessage
  );

  return {
    questionTextareaProps,
    isInvalidForm,
    submitForm,
    isSubmitLoading,
    isSubmitted,
  };
};

export default usePlanningForm;
