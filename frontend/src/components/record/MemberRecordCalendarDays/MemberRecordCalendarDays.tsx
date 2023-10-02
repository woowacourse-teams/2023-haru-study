import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { useModal } from '@Contexts/ModalProvider';
import { useNotification } from '@Contexts/NotificationProvider';

import format from '@Utils/format';

import type { MonthStorage } from '@Types/record';
import type { StudyBasicInfo } from '@Types/study';

import MemberRecordsModal from '../MemberRecordsModal/MemberRecordsModal';
import useMemberCalendarRecord from '../hooks/useMemberCalendarRecord';

type Props = {
  monthStorage: MonthStorage;
};

const MemberRecordCalendarDays = ({ monthStorage }: Props) => {
  const today = new Date();

  const calendarRef = useRef<HTMLUListElement>(null);

  const navigate = useNavigate();

  const { send } = useNotification();
  const { openModal } = useModal();
  const { temp, calendarData } = useMemberCalendarRecord({ monthStorage, calendarRef });

  const handleClickStudyItem = (studyId: string) => navigate(`${ROUTES_PATH.record}/${studyId}`);

  const openRecordsDetail = (fullDate: string, studies: StudyBasicInfo[]) => {
    if (studies.length < 1) return;

    openModal(<MemberRecordsModal fullDate={fullDate} studies={studies} handleClickStudyItem={handleClickStudyItem} />);
  };

  const notifyRestRecords = (fullDate: string, restRecords: number) => {
    send({
      message: `${fullDate}에 ${restRecords}개의 스터디를 더 완료했어요. 날짜를 클릭하면 자세한 정보를 알 수 있어요.`,
    });
  };

  const getDayFontColor = (dayOfWeek: number) => {
    if (dayOfWeek === 0) return color.red[600];

    if (dayOfWeek === 6) return color.blue[600];

    return color.black;
  };

  return (
    <Days $numberOfWeeks={temp.length / 7} ref={calendarRef}>
      {temp.map(({ fullDate, state, dayOfWeek, day, records, restRecords }) => (
        <li key={fullDate}>
          <DayContainer $isCurrentMonthDay={state === 'cur'} $fontColor={getDayFontColor(dayOfWeek)}>
            <Day
              $hasStudy={records.length > 0}
              $isToday={fullDate === format.date(today)}
              onClick={() => openRecordsDetail(fullDate, records)}
            >
              {day}
            </Day>
            <RestRecords
              $isHidden={restRecords < 1 || calendarData === 'count'}
              onClick={() => notifyRestRecords(fullDate, restRecords)}
            >
              +{restRecords}
            </RestRecords>
          </DayContainer>
          {calendarData === 'name' ? (
            <Records>
              {records.slice(0, 3).map(({ studyId, name }) => (
                <Study key={studyId} onClick={() => handleClickStudyItem(studyId)}>
                  {name}
                </Study>
              ))}
            </Records>
          ) : (
            <TotalRecordCount onClick={() => openRecordsDetail(fullDate, records)}>
              {records.length > 0 ? <span>{records.length}</span> : ''}
            </TotalRecordCount>
          )}
        </li>
      ))}
    </Days>
  );
};

export default MemberRecordCalendarDays;

type DaysProps = {
  $numberOfWeeks: number;
};

const Days = styled.ul<DaysProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $numberOfWeeks }) => `repeat(${$numberOfWeeks}, minmax(130px, auto))`};
  gap: 1px;
  border: 1px solid ${color.neutral[200]};

  background-color: ${color.neutral[200]};

  & > li {
    display: flex;
    flex-direction: column;
    padding: 5px;

    background-color: ${color.white};
  }

  @media screen and (max-width: 510px) {
    font-size: 1.4rem;
    grid-template-rows: ${({ $numberOfWeeks }) => `repeat(${$numberOfWeeks}, minmax(80px, auto))`};
  }
`;

type DayContainerProps = {
  $isCurrentMonthDay: boolean;
  $fontColor: string;
};

const DayContainer = styled.div<DayContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${color.white};

  ${({ $isCurrentMonthDay, $fontColor }) => css`
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    color: ${$fontColor};
  `}
`;

type DayProps = {
  $isToday: boolean;
  $hasStudy: boolean;
};

const Day = styled.div<DayProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  width: 30px;
  height: 30px;

  ${({ $isToday, $hasStudy }) => css`
    background-color: ${$isToday && color.neutral[100]};

    cursor: ${$hasStudy && 'pointer'};
  `}

  @media screen and (max-width: 360px) {
    margin: 0 auto;
    margin-top: 5px;
  }
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

const Study = styled.li`
  padding: 2px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  background-color: ${color.neutral[50]};
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

    background-color: ${color.neutral[50]};

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
