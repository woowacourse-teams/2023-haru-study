import type { PlanList, RetrospectList } from '@Types/study';

export const PLAN_KEYWORDS: Readonly<PlanList> = {
  toDo: '학습목표',
  completionCondition: '완료 조건',
  expectedProbability: '성공적으로 마칠 확률과 그 이유',
  expectedDifficulty: '학습 중 예상되는 어려움',
  whatCanYouDo: '확률을 높이기 위한 방법',
};

export const PLAN_QUESTIONS: PlanList = {
  toDo: '이번 사이클에서 학습할 것은 무엇인가요?',
  completionCondition: `그 학습의 완료 조건은 무엇인가요?`,
  expectedProbability: '이번 사이클에서 학습을 성공적으로 마칠 확률은 몇 %로 예상되나요? 그 이유는 무엇인가요?',
  expectedDifficulty: `이번 사이클에서 가장 큰 어려움으로 예상되는 것은 무엇인가요?`,
  whatCanYouDo: '성공 확률이 80% 미만이라면, 80% 이상으로 만들기 위해 무엇을 할 수 있나요?',
};

export const RETROSPECT_KEYWORDS: RetrospectList = {
  doneAsExpected: '학습이 이루어진 과정',
  experiencedDifficulty: '학습과정에서의 겪은 어려움',
  lesson: '학습을 통해 얻은 교훈',
};

export const RETROSPECT_QUESTIONS: RetrospectList = {
  doneAsExpected: '실제로 학습이 어떻게 됐나요? 예상대로 잘 이루어졌나요?',
  experiencedDifficulty: '학습을 진행하면서 겪은 어려움은 어떤 것이 있었나요?',
  lesson: '학습 과정에서 어떤 교훈을 얻었나요?',
};
