import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';

import useRetrospectForm from '@Hooks/board/useRetrospectForm';

type Props = {
  isLastCycle: boolean;
  onClickSubmitButton: () => void;
  studyId: string;
  memberId: string;
};

const RetrospectForm = ({ isLastCycle, onClickSubmitButton, studyId, memberId }: Props) => {
  const navigate = useNavigate();
  const { questionTextareaProps, isInvalidForm, isSubmitLoading, submitForm } = useRetrospectForm(studyId, memberId);

  const handleClickButton = async () => {
    try {
      await submitForm();

      if (isLastCycle) {
        navigate('/');
        return;
      }
      onClickSubmitButton();
    } catch (error) {
      if (!(error instanceof Error)) return;
      alert(error.message);
    }
  };

  const buttonText = isLastCycle ? '스터디 종료하기' : '다음 사이클 시작하기';

  return (
    <Layout>
      <QuestionTextarea
        question="실제로 학습이 어떻게 됐나요? 예상대로 잘 이루어졌나요?"
        {...questionTextareaProps.doneAsExpected}
      />
      <QuestionTextarea
        question="학습을 진행하면서 겪은 어려움은 어떤 것이 있었나요?"
        {...questionTextareaProps.experiencedDifficulty}
      />
      <QuestionTextarea question="학습 과정에서 어떤 교훈을 얻었나요?" {...questionTextareaProps.lesson} />
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
  gap: 60px;

  padding: 60px 85px;

  overflow-y: auto;
`;
