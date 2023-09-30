import { styled } from 'styled-components';

import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';
import Tabs from '@Components/common/Tabs/Tabs';
import TabsSkeleton from '@Components/common/Tabs/TabsSkeleton';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { PLAN_KEYWORDS, RETROSPECT_KEYWORDS } from '@Constants/study';

import GoalIcon from '@Assets/icons/GoalIcon';
import PencilIcon from '@Assets/icons/PencilIcon';

import { getKeys } from '@Utils/getKeys';

import type { Plan, Retrospect } from '@Types/study';

import useMemberRecordContents from '../hooks/useMemberRecordContents';

type Props = {
  studyId: string;
  participantId: string;
  nickname: string;
};

const ProgressRecord = ({ studyId, nickname, participantId }: Props) => {
  const { memberRecordContents, isLoading } = useMemberRecordContents(studyId, participantId);

  const getPostPosition = (name: string) => {
    const charCode = name.charCodeAt(name.length - 1);
    const consonantCode = (charCode - 0xac00) % 28;

    if (consonantCode === 0) {
      return '가';
    }

    return '이(가)';
  };

  if (isLoading) {
    return <TabsSkeleton />;
  }

  return (
    <ProgressRecordLayout>
      <Tabs>
        {memberRecordContents?.map((content) => (
          <Tabs.Item key={content.cycle} label={`${content.cycle}번째 사이클`}>
            <TabItemContainer>
              <TabItemSection>
                <Typography variant="h5">
                  <GoalIcon color={color.blue[500]} />
                  {nickname}
                  {getPostPosition(nickname)} 작성한 목표
                </Typography>
                {getKeys<Plan>(PLAN_KEYWORDS).map((key) => (
                  <QuestionAnswer
                    key={key}
                    question={PLAN_KEYWORDS[key]}
                    answer={content.plan[key]}
                    iconColor={color.blue[500]}
                  />
                ))}
              </TabItemSection>
              <TabItemSection>
                <Typography variant="h5">
                  <PencilIcon color={color.teal[500]} />
                  {nickname}
                  {getPostPosition(nickname)} 작성한 목표
                </Typography>
                {getKeys<Retrospect>(RETROSPECT_KEYWORDS).map((key) => (
                  <QuestionAnswer
                    key={key}
                    question={RETROSPECT_KEYWORDS[key]}
                    answer={content.retrospect[key]}
                    iconColor={color.teal[500]}
                  />
                ))}
              </TabItemSection>
            </TabItemContainer>
          </Tabs.Item>
        ))}
      </Tabs>
    </ProgressRecordLayout>
  );
};

export default ProgressRecord;

const ProgressRecordLayout = styled.div`
  padding: 40px 30px;
  min-height: 308px;

  h5 {
    display: flex;
    align-items: center;
  }

  p {
    word-break: break-all;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const TabItemContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const TabItemSection = styled.div`
  width: 46%;

  display: flex;
  flex-direction: column;
  gap: 45px;

  svg {
    margin-right: 10px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 20px;

    svg {
      width: 15px;
      height: 15px;
    }

    h5 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.8rem;
    }
  }
`;
