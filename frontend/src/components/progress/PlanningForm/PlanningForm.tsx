import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';
import Typography from '@Components/common/Typography/Typography';

import useDisplay from '@Hooks/common/useDisplay';

import { PLAN_QUESTIONS } from '@Constants/study';

import { useModal } from '@Contexts/ModalProvider';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import GuideModal from '../GuideModal/GuideModal';
import usePlanningForm from '../hooks/usePlanningForm';

const PlanningForm = () => {
  const { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm } = usePlanningForm();

  const { isShow: isOpenOptionalQuestion, toggleShow: toggleOptionalQuestion } = useDisplay();
  const { openModal } = useModal();

  const handleClickGuideButton = (question: 'toDo' | 'completionCondition') => () => {
    openModal(<GuideModal question={question} />);
  };

  return (
    <Layout>
      <QuestionLayout>
        <Typography variant="h5" fontWeight="600">
          다음 항목에 답변해주세요.
        </Typography>
        <QuestionList>
          <QuestionTextarea
            question={PLAN_QUESTIONS.toDo}
            onClickGuideButton={handleClickGuideButton('toDo')}
            {...questionTextareaProps.toDo}
          />
          <QuestionTextarea
            question={PLAN_QUESTIONS.completionCondition}
            onClickGuideButton={handleClickGuideButton('completionCondition')}
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
      <Button variant="primary" type="submit" onClick={submitForm} isLoading={isSubmitLoading} disabled={isInvalidForm}>
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
