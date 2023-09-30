import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';

import color from '@Styles/color';

import { PLAN_KEYWORDS } from '@Constants/study';

import { getKeys } from '@Utils/getKeys';

import type { Plan } from '@Types/study';

import useStudyingForm from '../hooks/useStudyingForm';

const StudyingForm = () => {
  const { planList, isSubmitLoading, submitForm } = useStudyingForm();

  return (
    planList && (
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
    )
  );
};

export default StudyingForm;

const Layout = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PlanResultList = styled.ul`
  width: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 50px;
  background-color: #fff;
  border-radius: 14px;

  overflow-y: auto;

  @media screen and (max-width: 768px) {
    padding: 50px 20px;

    gap: 40px;

    h5 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.8rem;
    }
  }
`;
