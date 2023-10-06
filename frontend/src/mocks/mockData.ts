export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';

export const NEW_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

// 프로필 정보 조회 데이터
export const USER_DATA = {
  memberId: '1',
  name: '맘모스',
  email: 'haru12@gmail.com',
  imageUrl: 'https://lh3.google.com/u/0/ogw/AGvuzYZKngVdZecWrpGTnHj7hQRtO5p9tjelI5lvCcsk=s64-c-mo',
  loginType: 'google',
};

// 단일 스터디 정보 조회 데이터
export const STUDY_INFO = {
  studyId: 0,
  name: '우테코',
  totalCycle: 3,
  timePerCycle: 25,
  currentCycle: 1,
  studyStep: 'progress',
  progressStep: 'planning',
  createdDate: '2023-10-05T04:28:19.126Z',
  lastModifiedDate: '2023-10-05T04:28:19.126Z',
};

// 단일 스터디 참여자 조회 데이터
export const STUDY_PARTICIPANT = {
  participantId: 0,
  nickname: '룩소',
  isHost: true,
};

// 멤버 컨텐츠 조회 데이터
export const STUDY_CONTENT = [
  {
    cycle: 1,
    plan: {
      toDo: '모던 자바스크립트 15장 정독(let, const 키워드와 블록 레벨 스코프)',
      completionCondition:
        '블록 레벨 스코프가 무엇인지 한 줄로 설명할 수 있다. -> 예시를 통해 1분 이내로 설명할 수 있다.',
      expectedProbability: '80% 이미 학습한 내용이기 때문이다.',
      expectedDifficulty: '개념을 학습한 후, 나만의 언어로 정리하는 것',
      whatCanYouDo: '핵심적인 내용을 먼저 정리한다.',
    },
    retrospect: {
      doneAsExpected:
        '이전에 학습한 내용이여서 이해는 어렵지 않았지만 짧게 정리를 하고 이를 습득하는데 어려움이 있었다. 실제로 누군가에게 설명을 할 수 있는지 확인해봐야겠다.',
      experiencedDifficulty: '깔끔한 문장으로 정리하는 것, 누군가에게 과연 매끄럽게 설명을 할 수 있을지',
      lesson: 'var키워드는 혼란만 초래할 뿐이다. var 키워드는 브라우저에게 맡기자',
    },
  },
  {
    cycle: 2,
    plan: {
      toDo: '알고리즘 한 문제를 푼다',
      completionCondition: '알고리즘 한 문제에 대해 모든 테스트케이스가 통과해야 한다.',
      expectedProbability: '80% 도전해볼만한 가치가 있기 때문',
      expectedDifficulty: '아직 잘 모르는 알고리즘 개념이 나오면 힘들 것 같다.',
      whatCanYouDo: '문제 설명 부터 잘 보자.',
    },
    retrospect: {
      doneAsExpected: '로직은 맞는거같은데 시간초과 때문에 통과하지는 못했습니다',
      experiencedDifficulty:
        '복병은 시간초과를 예상하지 않고 코드를 짰다는 것..? 알고리즘에 익숙하지 않아 로직에만 집중하다보니 그런 것 같습니다',
      lesson: ' 로직이 맞다고 맞는건 아니다. 풀기전에 잘 생각해보자..',
    },
  },
  {
    cycle: 3,
    plan: {
      toDo: '미션 회고 글 포스팅',
      completionCondition: '한 챕터의 내용을 완성',
      expectedProbability: '60%',
      expectedDifficulty: '좋은 글을 쓰기 위해 고민이 많아질 수 있다.',
      whatCanYouDo: '글을 완벽하게 쓰려고 하기보단 러프하게 먼저 쓴다.',
    },
    retrospect: {
      doneAsExpected: '한 챕터의 절반 정도 작성한 것 같습니다.',
      experiencedDifficulty:
        '캡처하고 붙여 넣느라 시간이 좀 걸렸습니다. 그리고 챕터의 방향성이 조금 수정되어서 원할하게 작성하지 못했습니다.',
      lesson: '글을 한 번에 쓰려고 하지말고 중간중간 틈틈이 기록을 해놔야 할 것 같아요.',
    },
  },
  {
    cycle: 4,
    plan: {
      toDo: '미션 회고 글 포스팅',
      completionCondition: '한 챕터의 내용을 완성',
      expectedProbability: '60%',
      expectedDifficulty: '좋은 글을 쓰기 위해 고민이 많아질 수 있다.',
      whatCanYouDo: '글을 완벽하게 쓰려고 하기보단 러프하게 먼저 쓴다.',
    },
    retrospect: {
      doneAsExpected: '한 챕터의 절반 정도 작성한 것 같습니다.',
      experiencedDifficulty:
        '캡처하고 붙여 넣느라 시간이 좀 걸렸습니다. 그리고 챕터의 방향성이 조금 수정되어서 원할하게 작성하지 못했습니다.',
      lesson: '글을 한 번에 쓰려고 하지말고 중간중간 틈틈이 기록을 해놔야 할 것 같아요.',
    },
  },
  {
    cycle: 5,
    plan: {
      toDo: '미션 회고 글 포스팅',
      completionCondition: '한 챕터의 내용을 완성',
      expectedProbability: '60%',
      expectedDifficulty: '좋은 글을 쓰기 위해 고민이 많아질 수 있다.',
      whatCanYouDo: '글을 완벽하게 쓰려고 하기보단 러프하게 먼저 쓴다.',
    },
    retrospect: {
      doneAsExpected: '한 챕터의 절반 정도 작성한 것 같습니다.',
      experiencedDifficulty:
        '캡처하고 붙여 넣느라 시간이 좀 걸렸습니다. 그리고 챕터의 방향성이 조금 수정되어서 원할하게 작성하지 못했습니다.',
      lesson: '글을 한 번에 쓰려고 하지말고 중간중간 틈틈이 기록을 해놔야 할 것 같아요.',
    },
  },
  {
    cycle: 6,
    plan: {},
    retrospect: {},
  },
];

// 스터디 참여자 조회 데이터
export const STUDY_PARTICIPANT_LIST = [
  {
    participantId: '1',
    nickname: '노아',
    isHost: true,
  },
  {
    participantId: '2',
    nickname: '룩소룩소룩소룩소룩소',
    isHost: false,
  },
  {
    participantId: '3',
    nickname: '엽토',
    isHost: false,
  },
  {
    participantId: '4',
    nickname: '테오',
    isHost: false,
  },
  {
    participantId: '5',
    nickname: '모디',
    isHost: false,
  },
  {
    participantId: '6',
    nickname: '히이로',
    isHost: false,
  },
  {
    participantId: '7',
    nickname: '마코',
    isHost: false,
  },
  {
    participantId: '8',
    nickname: '도밥',
    isHost: false,
  },
  {
    participantId: '9',
    nickname: 'noah',
    isHost: false,
  },
];

// 스터디 정보 조회 데이터
export const STUDY_LIST = [
  // 추가 필요
];
