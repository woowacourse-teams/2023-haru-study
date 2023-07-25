import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';

import useQuestionTextarea from '@Hooks/useQuestionTextarea';

type Props = {
  isLastCycle: boolean;
  onClickSubmitButton: () => void;
};

const RetrospectForm = ({ isLastCycle, onClickSubmitButton }: Props) => {
  const toDoProps = useQuestionTextarea({
    question: `실제로 학습이 어떻게 됐나요? 예상대로 잘 이루어졌나요?`,
    minLength: 10,
    maxLength: 500,
    required: true,
  });

  const completionConditionProps = useQuestionTextarea({
    question: `학습을 진행하면서 겪은 어려움은 어떤 것이 있었나요?`,
    minLength: 10,
    maxLength: 500,
    required: true,
  });

  const expectedProbabilityProps = useQuestionTextarea({
    question: `학습 과정에서 어떤 교훈을 얻었나요?`,
    minLength: 10,
    maxLength: 500,
    required: true,
  });

  const buttonText = isLastCycle ? '스터디 종료하기' : '다음 사이클 시작하기';

  const handleClickButton = () => {
    onClickSubmitButton();
  };

  return (
    <Layout>
      <QuestionTextarea {...toDoProps} />
      <QuestionTextarea {...completionConditionProps} />
      <QuestionTextarea {...expectedProbabilityProps} />
      <Button variant="success" type="submit" onClick={handleClickButton}>
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
