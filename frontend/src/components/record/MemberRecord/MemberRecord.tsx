import { styled } from 'styled-components';

import Tabs from '@Components/common/Tabs/Tabs';
import TabsSkeleton from '@Components/common/Tabs/TabsSkeleton';
import Typography from '@Components/common/Typography/Typography';

import useFetch from '@Hooks/useFetch';

import color from '@Styles/color';

import GoalIcon from '@Assets/icons/GoalIcon';
import PencilIcon from '@Assets/icons/PencilIcon';

import AnswerQuestion from '../AnswerQuestion/AnswerQuestion';

const PLAN_QUESTION = [
  { key: 'toDo', question: '학습 목표' },
  { key: 'completionCondition', question: '학습 완료 조건' },
  { key: 'expectedProbability', question: '성공적으로 마칠 확률과 그 이유' },
  { key: 'expectedDifficulty', question: '병목으로 예상 되는 가장 큰 것' },
  { key: 'whatCanYouDo', question: '학습 시간이 초과된다면 초과된 원인 혹은 이유' },
] as const;

const RETROSPECT_QUESTION = [
  { key: 'doneAsExpected', question: '학습이 이루어진 과정' },
  { key: 'experiencedDifficulty', question: '학습과정에서의 겪은 어려움' },
  { key: 'lesson', question: '학습을 통해 얻은 교훈' },
] as const;

type MemberRecordContent = {
  cycle: number;
  plan: {
    toDo: string;
    completionCondition: string;
    expectedProbability: string;
    expectedDifficulty: string;
    whatCanYouDo: string;
  };
  retrospect: {
    doneAsExpected: string;
    experiencedDifficulty: string;
    lesson: string;
  };
};

type MemberRecordContents = {
  content: MemberRecordContent[];
};

type Props = {
  studyId: string;
  memberId: number;
  nickname: string;
};

const MemberRecord = ({ studyId, nickname, memberId }: Props) => {
  const { data, status } = useFetch<MemberRecordContents>(`/api/studies/${studyId}/members/${memberId}/content`);
  const isLoading = status === 'pending';

  const memberContents = data?.content;

  if (isLoading) {
    return <TabsSkeleton />;
  }

  return (
    <MemberRecordLayout>
      <Tabs>
        {memberContents?.map((content) => (
          <Tabs.Item key={content.cycle} label={`${content.cycle}번째 사이클`}>
            <TabItemContainer>
              <TabItemSection>
                <Typography variant="h5">
                  <GoalIcon color={color.blue[500]} />
                  {nickname}가 작성한 목표
                </Typography>
                {PLAN_QUESTION.map(({ question, key }) => (
                  <AnswerQuestion key={key} question={question} answer={content.plan[key]} topic="plan" />
                ))}
              </TabItemSection>
              <TabItemSection>
                <Typography variant="h5">
                  <PencilIcon color={color.teal[500]} />
                  {nickname}가 작성한 회고
                </Typography>
                {RETROSPECT_QUESTION.map(({ question, key }) => (
                  <AnswerQuestion key={key} question={question} answer={content.retrospect[key]} topic="retrospect" />
                ))}
              </TabItemSection>
            </TabItemContainer>
          </Tabs.Item>
        ))}
      </Tabs>
    </MemberRecordLayout>
  );
};

export default MemberRecord;

const MemberRecordLayout = styled.div`
  padding: 40px 30px;

  h5 {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 10px;
  }

  p {
    word-break: break-all;
  }
`;

const TabItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 90px;
  align-items: flex-start;

  margin-top: 20px;
`;

const TabItemSection = styled.div`
  display: grid;
  row-gap: 45px;
  align-items: flex-start;
`;
