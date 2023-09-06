import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';
import Typography from '@Components/common/Typography/Typography';

import useDisplay from '@Hooks/common/useDisplay';

import { ROUTES_PATH } from '@Constants/routes';
import { RETROSPECT_QUESTIONS } from '@Constants/study';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import useRetrospectForm from '../hooks/useRetrospectForm';

type Props = {
  isLastCycle: boolean;
  onClickSubmitButton: () => Promise<void>;
  studyId: string;
  progressId: string;
};

const RetrospectForm = ({ isLastCycle, onClickSubmitButton, studyId, progressId }: Props) => {
  const navigate = useNavigate();
  const { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm } = useRetrospectForm(
    studyId,
    progressId,
    onClickSubmitButton,
  );

  const { isShow: isOpenOptionalQuestion, toggleShow: toggleOptionalQuestion } = useDisplay();

  const handleClickButton = async () => {
    try {
      await submitForm();

      if (isLastCycle) {
        navigate(`${ROUTES_PATH.record}/${studyId}`);
        return;
      }
    } catch (error) {
      if (!(error instanceof Error)) return;
      alert(error.message);
    }
  };

  const buttonText = isLastCycle ? '스터디 종료하기' : '다음 사이클 시작하기';

  return (
    <Layout>
      <QuestionLayout>
        <Typography variant="h5" fontWeight="600">
          다음 항목에 답변해주세요.
        </Typography>
        <QuestionList>
          <QuestionTextarea question={RETROSPECT_QUESTIONS.doneAsExpected} {...questionTextareaProps.doneAsExpected} />
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
              {...questionTextareaProps.experiencedDifficulty}
            />
            <QuestionTextarea question={RETROSPECT_QUESTIONS.lesson} {...questionTextareaProps.lesson} />
          </QuestionList>
        )}
      </QuestionLayout>
      <Button
        variant="success"
        type="submit"
        onClick={handleClickButton}
        isLoading={isSubmitLoading}
        disabled={isInvalidForm}
      >
        {buttonText}
      </Button>
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
