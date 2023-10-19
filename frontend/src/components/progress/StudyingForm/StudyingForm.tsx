import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';

import color from '@Styles/color';

import { PLAN_KEYWORDS } from '@Constants/study';

import { useParticipantInfo, useStudyProgressAction } from '@Contexts/StudyProgressProvider';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import { getKeys } from '@Utils/getKeys';

import type { Plan } from '@Types/study';

import useStudyingForm from '../hooks/useStudyingForm';

const StudyingForm = () => {
  const { isHost } = useParticipantInfo();
  const { planList } = useStudyingForm();
  const { moveToNextStep, moveToNextStepLoading } = useStudyProgressAction();

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
        {isHost && (
          <NextStepButton
            variant="outlined"
            onClick={moveToNextStep}
            isLoading={moveToNextStepLoading}
            loadingCircleColor={color.red[600]}
          >
            회고 단계로 <ArrowIcon direction="right" color={color.red[600]} />
          </NextStepButton>
        )}
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

const NextStepButton = styled(Button)`
  border-color: ${color.red[600]};
  color: ${color.red[600]};

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;
