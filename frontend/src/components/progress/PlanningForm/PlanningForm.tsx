import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';
import Typography from '@Components/common/Typography/Typography';

import useDisplay from '@Hooks/common/useDisplay';

import color from '@Styles/color';

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
      <ButtonContainer>
        <StyledButton
          variant="primary"
          type="submit"
          onClick={submitForm}
          isLoading={isSubmitLoading}
          disabled={isInvalidForm}
        >
          목표 제출하기
        </StyledButton>
        <StyledButton variant="outlined" loadingCricleColor={color.blue[500]}>
          학습 단계로
          <ArrowIcon direction="right" color={color.blue[500]} />
        </StyledButton>
      </ButtonContainer>
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
`;

const QuestionLayout = styled.div`
  width: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 40px;

  overflow-y: auto;

  h5 {
    font-size: 2rem;
  }
`;

const QuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media screen and (max-width: 768px) {
    gap: 40px;

    & > div {
      padding: 16px 20px 10px 20px;
    }

    h6 {
      min-height: 30px;

      font-size: 1.8rem;
    }

    button {
      padding: 8px 10px;
      font-size: 1.4rem;
    }

    textarea {
      height: 70px;
    }
  }
`;

const OptionalQuestionToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

const StyledButton = styled(Button)`
  padding-left: 0;
  padding-right: 0;

  flex: 1;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;
