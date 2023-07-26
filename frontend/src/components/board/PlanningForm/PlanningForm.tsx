import { useState } from 'react';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';

import useQuestionTextarea from '@Hooks/useQuestionTextarea';

type Props = {
  cycle: number;
  minutes: number;
  onClickSubmitButton: () => void;
};

const PlanningForm = ({ cycle, minutes, onClickSubmitButton }: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const toDoProps = useQuestionTextarea({
    question: `${cycle}번째 사이클(${minutes}분)에서 학습할 것은 무엇인가요?`,
    minLength: 10,
    maxLength: 500,
    required: true,
  });

  const completionConditionProps = useQuestionTextarea({
    question: `그 학습의 완료 조건은 무엇인가요?`,
    minLength: 10,
    maxLength: 500,
    required: true,
  });

  const expectedProbabilityProps = useQuestionTextarea({
    question: `학습을 ${minutes}분만에 성공적으로 마칠 확률은 몇 %로 예상되나요? 그 이유는 무엇인가요?`,
    maxLength: 500,
  });

  const expectedDifficultyProps = useQuestionTextarea({
    question: `${minutes}분의 시간 동안 가장 큰 어려움으로 예상되는 것은 무엇인가요?`,
    maxLength: 500,
  });

  const whatCanYouDoProps = useQuestionTextarea({
    question: `성공 확률이 80% 미만이라면, 80% 이상으로 만들기 위해 무엇을 할 수 있나요?`,
    maxLength: 500,
  });

  const isDisabledButton = !!(
    toDoProps.errorMessage ||
    completionConditionProps.errorMessage ||
    expectedDifficultyProps.errorMessage ||
    expectedProbabilityProps.errorMessage ||
    whatCanYouDoProps.errorMessage
  );

  const handleClickButton = async () => {
    setIsSubmitLoading(true);
    const response = await fetch('/api/studies/123/members/1/content/plans', {
      method: 'POST',
      body: JSON.stringify({
        toDo: toDoProps.value,
        completionCondition: completionConditionProps.value,
        expectedProbability: expectedProbabilityProps.value,
        expectedDifficulty: expectedDifficultyProps.value,
        whatCanYouDo: whatCanYouDoProps.value,
      }),
    });

    setIsSubmitLoading(false);
    if (!response.ok) {
      alert('에러 발생');
      return;
    }
    onClickSubmitButton();
  };

  return (
    <Layout>
      <QuestionTextarea {...toDoProps} />
      <QuestionTextarea {...completionConditionProps} />
      <QuestionTextarea {...expectedProbabilityProps} />
      <QuestionTextarea {...expectedDifficultyProps} />
      <QuestionTextarea {...whatCanYouDoProps} />
      <Button
        variant="primary"
        type="submit"
        onClick={handleClickButton}
        isLoading={isSubmitLoading}
        disabled={isDisabledButton}
      >
        학습 시작하기
      </Button>
    </Layout>
  );
};

export default PlanningForm;

const Layout = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 60px 85px;

  overflow-y: auto;
`;
