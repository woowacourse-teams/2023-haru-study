import { Link, useParams } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Accordion from '@Components/common/Accordion/Accordion';
import Tabs from '@Components/common/Tabs/Tabs';
import Typography from '@Components/common/Typography/Typography';

import useFetch from '@Hooks/useFetch';

import color from '@Styles/color';

import CheckRound from '@Assets/icons/CheckRound';
import CycleIcon from '@Assets/icons/CycleIcon';
import GoalIcon from '@Assets/icons/GoalICon';
import PencilIcon from '@Assets/icons/PencilIcon';
import TimeLineIcon from '@Assets/icons/TimeLineIcon';

const StudyRecord = () => {
  const { studyId } = useParams<{ studyId: string }>();

  const { data } = useFetch<{
    members: { memberId: number; nickname: string }[];
    studyName: string;
    timePerCycle: number;
    totalCycle: number;
  }>(`/api/studies/${studyId!}/metadata`);

  return (
    <StudyRecordLayout>
      <Header>
        <Link to="/">
          <Typography
            variant="h1"
            $style={css`
              font-size: 4rem;
              font-weight: 200;
            `}
          >
            <Emphasis>하루</Emphasis>스터디
          </Typography>
        </Link>
      </Header>
      {/* 컴포넌트 분리 */}
      <RecordContentsLayout>
        <Typography
          variant="h2"
          $style={css`
            font-weight: 600;
          `}
        >
          {data?.studyName} 스터디에서의 기록
        </Typography>
        <StudyInformation>
          <StudyInfoContainer>
            <CycleIcon color={color.neutral[700]} />
            <Typography variant="p2">진행한 총 사이클</Typography>
            <Typography variant="p2">{data?.totalCycle}회</Typography>
          </StudyInfoContainer>
          <StudyInfoContainer>
            <TimeLineIcon />
            <Typography variant="p2">사이클 당 학습 시간</Typography>
            <Typography variant="p2">{data?.timePerCycle}분</Typography>
          </StudyInfoContainer>
        </StudyInformation>
        <Accordion>
          {data?.members.map((member) => (
            <Accordion.Item key={member.memberId}>
              <Accordion.Header>
                <Typography variant="h5">{member.nickname}의 기록</Typography>
              </Accordion.Header>
              <Accordion.Panel>
                <MemberRecord studyId={studyId!} memberId={member.memberId} nickname={member.nickname} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </RecordContentsLayout>
    </StudyRecordLayout>
  );
};

export default StudyRecord;

const StudyRecordLayout = styled.div`
  background-color: ${color.neutral[50]};

  min-height: 100vh;
`;

const Header = styled.header`
  padding: 50px;
`;

const RecordContentsLayout = styled.div`
  display: grid;
  row-gap: 40px;

  min-width: 1100px;
  max-width: 1100px;

  margin: 0 auto;
  padding-bottom: 60px;
`;

const StudyInformation = styled.div`
  display: grid;
  row-gap: 20px;
`;

const StudyInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 20px 180px 60px;
  align-items: center;
  column-gap: 10px;

  :nth-child(3) {
    text-align: end;
  }

  p {
    font-weight: 600;
    color: ${color.neutral[700]};
  }
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;

//

type Props = {
  studyId: string;
  memberId: number;
  nickname: string;
};

const PLAN_ANSWERS = [
  { key: 'toDo', answer: '학습 목표' },
  { key: 'completionCondition', answer: '학습 완료 조건' },
  { key: 'expectedProbability', answer: '성공적으로 마칠 확률과 그 이유' },
  { key: 'expectedDifficulty', answer: '병목으로 예상 되는 가장 큰 것' },
  { key: 'whatCanYouDo', answer: '학습 시간이 초과된다면 초과된 원인 혹은 이유' },
] as const;

const RETROSPECT_ANSWERS = [
  { key: 'doneAsExpected', answer: '학습이 이루어진 과정' },
  { key: 'experiencedDifficulty', answer: '학습과정에서의 겪은 어려움' },
  { key: 'lesson', answer: '학습을 통해 얻은 교훈' },
] as const;

const MemberRecord = ({ studyId, nickname, memberId }: Props) => {
  const { data } = useFetch<
    {
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
    }[]
  >(`/api/studies/${studyId}/members/${memberId}/content`);

  return (
    <MemberRecordLayout>
      <Tabs>
        {data?.map((contents) => (
          <Tabs.Item key={contents.cycle} label={`${contents.cycle}번째 사이클`}>
            <TabItemContainer>
              <TabItemSection>
                <Typography variant="h5">
                  <GoalIcon color={color.blue[500]} />
                  {nickname}가 작성한 목표
                </Typography>
                {PLAN_ANSWERS.map(({ answer, key }) => {
                  return (
                    <AnswerQuestion key={key} iconBackgroundColor={color.blue[500]}>
                      <CheckRound color={color.white} />
                      <Typography variant="h6">{answer}</Typography>
                      <Typography variant="p2">{contents.plan[key]}</Typography>
                    </AnswerQuestion>
                  );
                })}
              </TabItemSection>
              <TabItemSection>
                <Typography variant="h5">
                  <PencilIcon color={color.teal[500]} />
                  {nickname}가 작성한 회고
                </Typography>
                {RETROSPECT_ANSWERS.map(({ answer, key }) => {
                  return (
                    <AnswerQuestion key={key} iconBackgroundColor={color.teal[500]}>
                      <CheckRound color={color.white} />
                      <Typography variant="h6">{answer}</Typography>
                      <Typography variant="p2">{contents.retrospect[key]}</Typography>
                    </AnswerQuestion>
                  );
                })}
              </TabItemSection>
            </TabItemContainer>
          </Tabs.Item>
        ))}
      </Tabs>
    </MemberRecordLayout>
  );
};

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

type AnswerQuestionProps = {
  iconBackgroundColor: string;
};

const AnswerQuestion = styled.div<AnswerQuestionProps>`
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  row-gap: 24px;

  p {
    grid-column: 2 / 3;
  }

  svg {
    border-radius: 50%;
    ${({ iconBackgroundColor }) => css`
      background-color: ${iconBackgroundColor};
    `}
  }
`;
