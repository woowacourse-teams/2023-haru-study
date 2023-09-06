import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';

import useStudyingForm from '@Hooks/board/useStudyingForm';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';
import { PLAN_KEYWORDS } from '@Constants/study';

import { getKeys } from '@Utils/getKeys';

import type { Plan } from '@Types/study';

type Props = {
  onClickSubmitButton: () => Promise<void>;
  studyId: string;
  progressId: string;
  cycle: number;
};

const StudyingForm = ({ onClickSubmitButton, studyId, progressId, cycle }: Props) => {
  const navigate = useNavigate();
  const { planList, isSubmitLoading, error, submitForm } = useStudyingForm(
    studyId,
    progressId,
    cycle,
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

  if (error) {
    alert(error.message);
    if (confirm('메인 페이지로 돌아기시겠습니까?')) {
      navigate(ROUTES_PATH.landing);
    }
  }

  if (planList === null) {
    return (
      <LoadingLayout>
        <CircularProgress
          size="x-large"
          $style={css`
            border: 2px solid ${color.red[600]};
            border-color: ${color.red[600]} transparent transparent transparent;
          `}
        />
      </LoadingLayout>
    );
  }

  return (
    <Layout>
      <PlanResultList>
        {getKeys<Plan>(PLAN_KEYWORDS).map((planKey) => (
          <QuestionAnswer
            key={planKey}
            question={PLAN_KEYWORDS[planKey]}
            answer={planList[planKey]}
            iconColor={color.red[600]}
          />
        ))}
      </PlanResultList>
      <Button variant="danger" onClick={handleClickButton} isLoading={isSubmitLoading}>
        학습 마치기
      </Button>
    </Layout>
  );
};

export default StudyingForm;

const Layout = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 60px 85px;
`;

const PlanResultList = styled.ul`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 50px;
  background-color: #fff;
  border-radius: 14px;

  overflow-y: auto;
`;

const LoadingLayout = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
