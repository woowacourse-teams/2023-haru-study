export const STUDIES_KEY = {
  id: '아이디',
  name: '스터디 이름',
  totalCycle: '총 사이클',
  timePerCycle: '사이클 당 시간',
  currentCycle: '현재 사이클',
  step: '스탭',
  createdDate: '스터디 생성시간',
  lastModifiedDate: '마지막 수정시간',
  detail: '상세보기',
} as const;

export const STUDIES_DETAIL_KEY = {
  id: '아이디',
  participantId: '참여자 아이디',
  cycle: '사이클',
  plan: '계획 리스트',
  retrospect: '회고 리스트',
} as const;

export const PLAN_KEYWORDS = {
  toDo: '학습목표',
  completionCondition: '완료 조건',
  expectedProbability: '성공적으로 마칠 확률과 그 이유',
  expectedDifficulty: '학습 중 예상되는 어려움',
  whatCanYouDo: '확률을 높이기 위한 방법',
} as const;

export const RETROSPECT_KEYWORDS = {
  doneAsExpected: '학습이 이루어진 과정',
  experiencedDifficulty: '학습 과정에서의 겪은 어려움',
  lesson: '학습을 통해 느낀 점',
} as const;
