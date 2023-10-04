import { styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import CycleIcon from '@Assets/icons/CycleIcon';
import TimeLineIcon from '@Assets/icons/TimeLineIcon';

import format from '@Utils/format';

import type { StudyBasicInfo } from '@Types/study';

type Props = {
  record: StudyBasicInfo;
  handleClickStudyItem: (studyId: string) => void;
};

const MemberRecordItem = ({ record, handleClickStudyItem }: Props) => {
  return (
    <StudyItem key={record.studyId} onClick={() => handleClickStudyItem(record.studyId)}>
      <StudyNameDateContainer>
        <Typography variant="h6">{record.name} 스터디</Typography>
        <StudyDate>{format.date(new Date(record.createdDateTime))}</StudyDate>
      </StudyNameDateContainer>
      <StudyCycleInfoLayout>
        <StudyCycleInfoContainer>
          <CycleIcon color={color.neutral[500]} />
          <span>진행한 총 사이클</span>
          <span>{record.totalCycle}회</span>
        </StudyCycleInfoContainer>
        <StudyCycleInfoContainer>
          <TimeLineIcon color={color.neutral[500]} />
          <span>사이클 당 학습 시간</span>
          <span>{record.timePerCycle}분</span>
        </StudyCycleInfoContainer>
      </StudyCycleInfoLayout>
    </StudyItem>
  );
};

export default MemberRecordItem;

const StudyItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: ${color.white};
  border: 1px solid ${color.neutral[200]};
  border-radius: 7px;

  padding: 20px;

  cursor: pointer;

  transition: border 0.2s ease;

  &:hover {
    border: 1px solid ${color.blue[400]};
  }
`;

const StudyNameDateContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;

  h6 {
    max-width: 100%;
    word-break: break-all;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StudyDate = styled.span`
  color: ${color.neutral[700]};
`;

const StudyCycleInfoLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 25px;
`;

const StudyCycleInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 5px 10px;
  border-radius: 7px;

  background-color: ${color.neutral[100]};
  color: ${color.neutral[700]};

  :last-child {
    margin-left: 10px;
    font-size: 1.8rem;
    font-weight: 500;
  }
`;
