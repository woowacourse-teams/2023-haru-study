import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';
import Typography from '@Components/common/Typography/Typography';

import usePlanningForm from '@Hooks/board/usePlanningForm';
import useDisplay from '@Hooks/common/useDisplay';

import { PLAN_QUESTIONS } from '@Constants/study';

import ArrowIcon from '@Assets/icons/ArrowIcon';

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

  const { isShow: isOpenOptionalQuestion, toggleShow: toggleOptionalQuestion } = useDisplay();

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
      <QuestionLayout>
        <Typography variant="h5" fontWeight="600">
          다음 항목에 답변해주세요.
        </Typography>
        <QuestionList>
          <QuestionTextarea question={PLAN_QUESTIONS.toDo} {...questionTextareaProps.toDo} />
          <QuestionTextarea
            question={PLAN_QUESTIONS.completionCondition}
            {...questionTextareaProps.completionCondition}
          />
        </QuestionList>
        <OptionalQuestionToggle onClick={toggleOptionalQuestion}>
          <Typography variant="h5" fontWeight="600">
            더 구체적인 목표 설정을 원한다면?
          </Typography>
          <ArrowIcon direction={isOpenOptionalQuestion ? 'up' : 'down'} />
        </OptionalQuestionToggle>
        {isOpenOptionalQuestion && (
          <QuestionList>
            <QuestionTextarea
              question={PLAN_QUESTIONS.expectedProbability}
              {...questionTextareaProps.expectedProbability}
            />
            <QuestionTextarea
              question={PLAN_QUESTIONS.expectedDifficulty}
              {...questionTextareaProps.expectedDifficulty}
            />
            <QuestionTextarea question={PLAN_QUESTIONS.whatCanYouDo} {...questionTextareaProps.whatCanYouDo} />
          </QuestionList>
        )}
      </QuestionLayout>
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
  gap: 30px;

  padding: 60px 85px;
`;

const QuestionLayout = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;
  gap: 40px;

  overflow-y: auto;
`;

const QuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const OptionalQuestionToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
`;
