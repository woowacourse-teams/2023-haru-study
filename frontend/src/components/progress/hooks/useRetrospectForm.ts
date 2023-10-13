import { useState } from 'react';

import useMutation from '@Hooks/api/useMutation';
import useQuestionTextarea from '@Hooks/common/useQuestionTextarea';

import { useParticipantInfo, useStudyInfo } from '@Contexts/StudyProgressProvider';

import { requestWriteRetrospect } from '@Apis/index';

const useRetrospectForm = () => {
  const { studyId } = useStudyInfo();
  const { participantId } = useParticipantInfo();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate: submitForm, isLoading: isSubmitLoading } = useMutation(
    () =>
      requestWriteRetrospect(studyId, participantId, {
        doneAsExpected: questionTextareaProps.doneAsExpected.value,
        experiencedDifficulty: questionTextareaProps.experiencedDifficulty.value,
        lesson: questionTextareaProps.lesson.value,
      }),
    {
      onSuccess: () => setIsSubmitted(true),
    },
  );

  const questionTextareaProps = {
    doneAsExpected: useQuestionTextarea({
      minLength: 10,
      maxLength: 500,
      required: true,
    }),
    experiencedDifficulty: useQuestionTextarea({
      maxLength: 500,
    }),
    lesson: useQuestionTextarea({
      maxLength: 500,
    }),
  } as const;

  const isInvalidForm = !!(
    questionTextareaProps.doneAsExpected.errorMessage ||
    questionTextareaProps.experiencedDifficulty.errorMessage ||
    questionTextareaProps.lesson.errorMessage
  );

  return { questionTextareaProps, isInvalidForm, isSubmitLoading, isSubmitted, submitForm };
};

export default useRetrospectForm;
