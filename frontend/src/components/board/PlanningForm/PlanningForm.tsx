import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';

import usePlanningForm from '@Hooks/board/usePlanningForm';

import { PLAN_QUESTIONS } from '@Constants/study';

import { getKeys } from '@Utils/getKeys';

import type { Plan } from '@Types/study';

type Props = {
  onClickSubmitButton: () => Promise<void>;
  studyId: string;
  progressId: string;
};

const PlanningForm = ({ onClickSubmitButton, studyId, progressId }: Props) => {
  const { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm } = usePlanningForm(
    studyId,
    progressId,
    onClickSubmitButton,
  );

  const handleClickButton = async () => {
    try {
      await submitForm();
    } catch (error) {
      if (!(error instanceof Error)) return;
      alert(error.message);
    }
  };

  return (
    <Layout>
      {getKeys<Plan>(PLAN_QUESTIONS).map((key) => (
        <QuestionTextarea key={key} question={PLAN_QUESTIONS[key]} {...questionTextareaProps[key]} />
      ))}
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
