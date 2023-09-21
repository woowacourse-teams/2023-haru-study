import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { useModal } from '@Contexts/ModalProvider';

type RequiredQuestion = 'toDo' | 'completionCondition' | 'doneAsExpected';

const contents = {
  title: {
    toDo: '이번 사이클에서 학습할 것은 무엇인가요?',
    completionCondition: '그 학습의 완료 조건은 무엇인가요?',
    doneAsExpected: '실제로 학습이 어떻게 됐나요? 예상대로 잘 이루어졌나요?',
  },
  descriptions: {
    toDo: [
      '• 학습하고자 하는 분야나 주제를 명확하게 정의하세요.',
      '• 큰 목표를 작은 단계로 나눠보세요.',
      '• 예시 1) 자바스크립트 딥다이브 챕터15-1 독서 및 정리',
      '• 예시 2) 영단어 20개 외우기',
      '• 예시 3) 한국사 강의 3강(청동기 시대) 시청하기',
    ],
    completionCondition: [
      '• 학습한 내용에 대한 구체적인 결과물을 만들어 보세요.',
      '• 자기 평가를 통해 얼마나 잘 이해하고 있는지 확인해보세요.',
      '• 예시 1) 자바스크립트 호이스팅 개념 스터디원에게 설명하기',
      '• 예시 2) 학습한 영어 단어 테스트하여 만점 받기',
      '• 예시 3) 청동기 시대에 관련된 문제 5개 만들고 공유하기',
    ],
    doneAsExpected: [],
  },
} as const;

type Props = {
  question: RequiredQuestion;
};

const GuideModal = ({ question }: Props) => {
  const { closeModal } = useModal();

  return (
    <GuideLayout>
      <Typography variant="h6">{contents.title[question]}</Typography>
      <Separator />
      <Description>
        {contents.descriptions[question].map((description) => (
          <Typography key={description} variant="p3">
            {description}
          </Typography>
        ))}
      </Description>
      <Button
        variant="outlined"
        $style={css`
          color: ${color.blue[500]};
          border: none;
          &:hover {
            &:enabled {
              background-color: ${color.blue[50]};
            }
          }
        `}
        size="x-small"
        $block={false}
        onClick={closeModal}
      >
        확인
      </Button>
    </GuideLayout>
  );
};

const GuideLayout = styled.div`
  padding: 5px 10px;

  button {
    margin-top: 18px;
    float: right;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;

  margin: 24px 0;

  background-color: ${color.neutral[200]};
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default GuideModal;
