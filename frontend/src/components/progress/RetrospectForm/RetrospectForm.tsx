import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';
import Typography from '@Components/common/Typography/Typography';

import useDisplay from '@Hooks/common/useDisplay';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';
import { RETROSPECT_QUESTIONS } from '@Constants/study';

import { useNotification } from '@Contexts/NotificationProvider';
import { useParticipantInfo, useStudyInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import useParticipantsSubmit from '../hooks/useParticipantsSubmit';
import useRetrospectForm from '../hooks/useRetrospectForm';

const RetrospectForm = () => {
  const navigate = useNavigate();
  const { isShow: isOpenOptionalQuestion, toggleShow: toggleOptionalQuestion } = useDisplay();
  const { send } = useNotification();

  const { isHost } = useParticipantInfo();
  const { studyId, totalCycle, currentCycle } = useStudyInfo();
  const { questionTextareaProps, isInvalidForm, isSubmitLoading, isSubmitted, submitForm } = useRetrospectForm();
  const { checkAllParticipantSubmitted, checkParticipantSubmittedLoading } = useParticipantsSubmit();
  const { moveToNextStep, moveToNextStepLoading } = useStudyProgressAction();

  const isLastCycle = totalCycle === currentCycle;

  const submitRetrospectForm = async () => {
    await submitForm();

    send({ message: '회고 제출에 성공했습니다!', type: 'success' });
  };

  const moveToNextCycle = async () => {
    const isAllParticipantSubmitted = await checkAllParticipantSubmitted();
    const notiMessage = isLastCycle ? '그래도 스터디를 종료하시겠습니까?' : '그래도 다음 사이클로 넘어가시겠습니까?';

    if (!isAllParticipantSubmitted && !confirm(`아직 제출을 하지 않은 스터디원이 있습니다. ${notiMessage}`)) return;

    await moveToNextStep();

    if (isLastCycle) navigate(`${ROUTES_PATH.record}/${studyId}`);
  };

  return (
    <Layout>
      <QuestionLayout>
        <Typography variant="h5" fontWeight="600">
          다음 항목에 답변해주세요.
        </Typography>
        <QuestionList>
          <QuestionTextarea
            question={RETROSPECT_QUESTIONS.doneAsExpected}
            disabled={isSubmitted}
            {...questionTextareaProps.doneAsExpected}
          />
        </QuestionList>
        <OptionalQuestionToggle onClick={toggleOptionalQuestion}>
          <Typography variant="h5" fontWeight="600">
            더 구체적인 회고를 원한다면?
          </Typography>
          <ArrowIcon direction={isOpenOptionalQuestion ? 'up' : 'down'} />
        </OptionalQuestionToggle>
        {isOpenOptionalQuestion && (
          <QuestionList>
            <QuestionTextarea
              question={RETROSPECT_QUESTIONS.experiencedDifficulty}
              disabled={isSubmitted}
              {...questionTextareaProps.experiencedDifficulty}
            />
            <QuestionTextarea
              question={RETROSPECT_QUESTIONS.lesson}
              disabled={isSubmitted}
              {...questionTextareaProps.lesson}
            />
          </QuestionList>
        )}
      </QuestionLayout>
      <ButtonContainer>
        <StyledButton
          variant="success"
          type="submit"
          onClick={submitRetrospectForm}
          isLoading={isSubmitLoading}
          disabled={isInvalidForm || isSubmitted}
        >
          {isSubmitted ? '제출 완료' : '회고 제출하기'}
        </StyledButton>
        {isHost && (
          <NextStepButton
            variant="outlined"
            loadingCircleColor={color.teal[600]}
            onClick={moveToNextCycle}
            isLoading={checkParticipantSubmittedLoading || moveToNextStepLoading}
          >
            {isLastCycle ? '스터디 종료' : '다음 사이클로'}
            <ArrowIcon direction="right" color={color.teal[600]} />
          </NextStepButton>
        )}
      </ButtonContainer>
    </Layout>
  );
};

export default RetrospectForm;

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

const NextStepButton = styled(StyledButton)`
  border-color: ${color.teal[600]};
  color: ${color.teal[600]};
`;
