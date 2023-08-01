import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionTextarea from '@Components/common/QuestionTextarea/QuestionTextarea';

import useRetrospectForm from '@Hooks/board/useRetrospectForm';

import { ROUTES_PATH } from '@Constants/routes';
import { RETROSPECT_QUESTIONS } from '@Constants/study';

import { getKeys } from '@Utils/getKeys';

import type { Retrospect } from '@Types/study';

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
        navigate(`${ROUTES_PATH.record}/${studyId}`);
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
      {getKeys<Retrospect>(RETROSPECT_QUESTIONS).map((key) => (
        <QuestionTextarea key={key} question={RETROSPECT_QUESTIONS[key]} {...questionTextareaProps[key]} />
      ))}
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
