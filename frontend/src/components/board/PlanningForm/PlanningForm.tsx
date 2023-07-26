import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';

import usePlanningForm from '@Hooks/board/usePlanningForm';

type Props = {
  cycle: number;
  minutes: number;
  onClickSubmitButton: () => void;
  studyId: string;
  memberId: string;
};

const PlanningForm = ({ cycle, minutes, onClickSubmitButton, studyId, memberId }: Props) => {
  const { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm } = usePlanningForm(studyId, memberId);

  const handleClickButton = async () => {
    try {
      await submitForm();
      onClickSubmitButton();
    } catch (error) {
      if (!(error instanceof Error)) return;
      alert(error.message);
    }
  };

  return (
    <Layout>
      <QuestionTextarea
        question={`${cycle}번째 사이클(${minutes}분)에서 학습할 것은 무엇인가요?`}
        {...questionTextareaProps.toDo}
      />
      <QuestionTextarea question={`그 학습의 완료 조건은 무엇인가요?`} {...questionTextareaProps.completionCondition} />
      <QuestionTextarea
        question={`학습을 ${minutes}분만에 성공적으로 마칠 확률은 몇 %로 예상되나요? 그 이유는 무엇인가요?`}
        {...questionTextareaProps.expectedProbability}
      />
      <QuestionTextarea
        question={`${minutes}분의 시간 동안 가장 큰 어려움으로 예상되는 것은 무엇인가요?`}
        {...questionTextareaProps.expectedDifficulty}
      />
      <QuestionTextarea
        question={`성공 확률이 80% 미만이라면, 80% 이상으로 만들기 위해 무엇을 할 수 있나요?`}
        {...questionTextareaProps.whatCanYouDo}
      />
      <Button
        variant="primary"
        type="submit"
        onClick={handleClickButton}
        isLoading={isSubmitLoading}
        disabled={isInvalidForm}
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
