import { styled } from 'styled-components';

import QuestionAnswer from '@Components/common/QuestionAnswer/QuestionAnswer';
import Tabs from '@Components/common/Tabs/Tabs';
import TabsSkeleton from '@Components/common/Tabs/TabsSkeleton';
import Typography from '@Components/common/Typography/Typography';

import useMemberRecord from '@Hooks/record/useMemberRecord';

import color from '@Styles/color';

import { PLAN_KEYWORDS, RETROSPECT_KEYWORDS } from '@Constants/study';

import GoalIcon from '@Assets/icons/GoalIcon';
import PencilIcon from '@Assets/icons/PencilIcon';

import { getKeys } from '@Utils/getKeys';

import type { Plan, Retrospect } from '@Types/study';

type Props = {
  studyId: string;
  memberId: string;
  nickname: string;
};

const MemberRecord = ({ studyId, nickname, memberId }: Props) => {
  const { memberRecordContents, isLoading } = useMemberRecord(studyId, memberId, {
    errorHandler: (error) => alert(error.message),
  });

  if (isLoading) {
    return <TabsSkeleton />;
  }

  return (
    <MemberRecordLayout>
      <Tabs>
        {memberRecordContents?.map((content) => (
          <Tabs.Item key={content.cycle} label={`${content.cycle}번째 사이클`}>
            <TabItemContainer>
              <TabItemSection>
                <Typography variant="h5">
                  <GoalIcon color={color.blue[500]} />
                  {nickname}가 작성한 목표
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
                  {nickname}가 작성한 회고
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
