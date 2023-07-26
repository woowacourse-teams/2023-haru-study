import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';
import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';

import { Plan, PlanList } from '@Types/study';

import useStudyingForm from '@Hooks/board/useStudyingForm';

import color from '@Styles/color';

const questions: PlanList = {
  toDo: '학습목표',
  completionCondition: '완료 조건',
  expectedProbability: '성공적으로 마칠 확률과 그 이유',
  expectedDifficulty: '학습 중 예상되는 어려움',
  whatCanYouDo: '확률을 높이기 위한 방법',
};

type Props = {
  onClickSubmitButton: () => void;
};

const StudyingForm = ({ onClickSubmitButton }: Props) => {
  const { planList, isSubmitLoading, submitForm } = useStudyingForm();

  const handleClickButton = async () => {
    try {
      await submitForm();
      onClickSubmitButton();
    } catch (error) {
      if (!(error instanceof Error)) return;
      alert(error.message);
    }
  };

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
        {Object.keys(planList).map((planKey) => (
          <QuestionAnswer
            key={planKey}
            question={questions[planKey as Plan]}
            answer={planList[planKey as Plan]}
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
  gap: 40px;

  padding: 60px 85px;

  overflow-y: auto;
`;

const PlanResultList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 50px;
  background-color: #fff;
  border-radius: 14px;
`;

const LoadingLayout = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
