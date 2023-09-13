import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';

import color from '@Styles/color';

import { PLAN_KEYWORDS } from '@Constants/study';

import { getKeys } from '@Utils/getKeys';

import type { Plan } from '@Types/study';

import useStudyingForm from '../hooks/useStudyingForm';

const StudyingForm = () => {
  const { planList, isSubmitLoading, submitForm } = useStudyingForm();

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
      <Button variant="danger" onClick={submitForm} isLoading={isSubmitLoading}>
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
