import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import useFetch from '@Hooks/api/useFetch';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import CycleIcon from '@Assets/icons/CycleIcon';
import TimeLineIcon from '@Assets/icons/TimeLineIcon';

import date from '@Utils/date';

import { requestGetMemberStudyListData } from '@Apis/index';

import EmptyMemberRecord from '../EmptyMemberRecord/EmptyMemberRecord';

// memberId 옵션널 제거 필요
type Props = {
  memberId?: string;
};

// memberId 기본 값 수정 필요
const MemberRecordList = ({ memberId = '1' }: Props) => {
  const navigate = useNavigate();

  const { result } = useFetch(() => requestGetMemberStudyListData(memberId));
  const studyList = result ? result.data.studies : [];

  const handleClickStudyItem = (studyId: string) => navigate(`${ROUTES_PATH.record}/${studyId}`);

  if (result && studyList.length === 0) return <EmptyMemberRecord />;

  return (
    <Layout>
      {studyList.map(({ studyId, name, createdDateTime, totalCycle, timePerCycle }) => {
        return (
          <StudyItem key={studyId} onClick={() => handleClickStudyItem(studyId)}>
            <StudyNameDateContainer>
              <Typography variant="h6">{name} 스터디</Typography>
              <StudyDate>{date.format(new Date(createdDateTime))}</StudyDate>
            </StudyNameDateContainer>
            <StudyCycleInfoLayout>
              <StudyCycleInfoContainer>
                <CycleIcon color={color.neutral[500]} />
                <span>진행한 총 사이클</span>
                <span>{totalCycle}회</span>
              </StudyCycleInfoContainer>
              <StudyCycleInfoContainer>
                <TimeLineIcon color={color.neutral[500]} />
                <span>사이클 당 학습 시간</span>
                <span>{timePerCycle}분</span>
              </StudyCycleInfoContainer>
            </StudyCycleInfoLayout>
          </StudyItem>
        );
      })}
    </Layout>
  );
};

export default MemberRecordList;

const Layout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StudyItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: ${color.white};
  border: 1px solid ${color.neutral[200]};
  border-radius: 7px;

  padding: 20px;

  cursor: pointer;
`;

const StudyNameDateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
    font-weight: 400;
  }
`;
