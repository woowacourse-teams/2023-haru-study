import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { useModal } from '@Contexts/ModalProvider';

import format from '@Utils/format';

import type { CalendarRecord } from '@Types/record';
import type { StudyInfo } from '@Types/study';

import CalendarDay from '../CalendarDay/CalendarDay';
import MemberRecordsModal from '../MemberRecordsModal/MemberRecordsModal';

type Props = {
  record: CalendarRecord;
  calendarData: 'name' | 'count' | null;
};

const MemberRecordCalendarDay = ({ record, calendarData }: Props) => {
  const { state, records, day, date, restRecordsNumber, dayOfWeek } = record;

  const today = new Date();

  const navigate = useNavigate();

  const { openModal } = useModal();

  const handleClickStudyItem = (studyId: string) => navigate(`${ROUTES_PATH.record}/${studyId}`);

  const openRecordsDetail = (fullDate: string, studies: StudyInfo[]) => {
    if (studies.length < 1) return;

    openModal(<MemberRecordsModal fullDate={fullDate} studies={studies} handleClickStudyItem={handleClickStudyItem} />);
  };

  return (
    <Layout>
      <DayContainer>
        <CalendarDay
          hasStudy={records.length > 0}
          isToday={format.date(date) === format.date(today)}
          onClick={() => openRecordsDetail(format.date(date), records)}
          isCurrentMonthDay={state === 'cur'}
          dayOfWeek={dayOfWeek}
        >
          {day}
        </CalendarDay>
        <RestRecords
          $isHidden={restRecordsNumber < 1 || calendarData === 'count'}
          onClick={() => openRecordsDetail(format.date(date), records)}
        >
          +{restRecordsNumber}
        </RestRecords>
      </DayContainer>
      {calendarData === 'name' ? (
        <Records>
          {records.slice(0, 3).map(({ studyId, name }) => (
            <Record test-id="study-id" key={studyId} onClick={() => handleClickStudyItem(studyId)}>
              {name}
            </Record>
          ))}
        </Records>
      ) : (
        <TotalRecordCount onClick={() => openRecordsDetail(format.date(date), records)}>
          {records.length > 0 ? <span>{records.length}</span> : ''}
        </TotalRecordCount>
      )}
    </Layout>
  );
};

export default MemberRecordCalendarDay;

const Layout = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px;

  background-color: ${color.white};
`;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type RestRecordsProps = {
  $isHidden: boolean;
};

const RestRecords = styled.div<RestRecordsProps>`
  display: flex;
  justify-content: center;

  font-size: 1.4rem;

  width: 22px;
  height: 22px;

  border-radius: 50%;
  background-color: ${color.blue[50]};

  cursor: pointer;

  ${({ $isHidden }) => css`
    display: ${$isHidden ? 'none' : 'block'};
  `}
`;

const Records = styled.ul`
  display: grid;
  row-gap: 4px;
`;

const Record = styled.li`
  padding: 2px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  background-color: ${color.neutral[100]};
  border-radius: 5px;

  cursor: pointer;
`;

const TotalRecordCount = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8rem;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 42px;
    height: 42px;

    border-radius: 50%;

    background-color: ${color.neutral[100]};

    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;

    & > span {
      width: 32px;
      height: 32px;
    }
  }
`;
