import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';

import color from '@Styles/color';

type Plan = 'toDo' | 'completionCondition' | 'expectedProbability' | 'expecetedDifficulty' | 'whatCanYouDo';

type PlanList = {
  [key in Plan]: {
    question: string;
    answer: string;
  };
};

// 임시 mock 데이터
const mockData: PlanList = {
  toDo: {
    question: '학습목표',
    answer: '자바스크립트의 this',
  },
  completionCondition: {
    question: '완료 조건',
    answer: '자바스크립트 딥다이브 챕터5 완독',
  },
  expectedProbability: {
    question: '성공적으로 마칠 확률과 그 이유',
    answer: '60프로, 분량이 좀 많다.',
  },
  expecetedDifficulty: {
    question: '학습 중 예상되는 어려움',
    answer: '클래스에 대한 이해도 부족',
  },
  whatCanYouDo: {
    question: '확률을 높이기 위한 방법',
    answer: '실제 this 사용 예시를 보면서 공부하기',
  },
};

type Props = {
  onClickSubmitButton: () => void;
};

const PlanResult = ({ onClickSubmitButton }: Props) => {
  const planList = mockData;

  const handleClickButton = () => {
    // 제출 로직 추가 예정
    onClickSubmitButton();
  };
  return (
    <Layout>
      <PlanResultList>
        {Object.keys(planList).map((planKey) => (
          <QuestionAnswer key={planKey} {...planList[planKey as Plan]} iconColor={color.red[600]} />
        ))}
      </PlanResultList>
      <Button variant="danger" onClick={handleClickButton}>
        학습 마치기
      </Button>
    </Layout>
  );
};

export default PlanResult;

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
