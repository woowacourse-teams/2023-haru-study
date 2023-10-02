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

  const navigate = useNavigate();

  const { send } = useNotification();
  const { openModal } = useModal();
  const { temp } = useMemberCalendarRecord({ monthStorage });

  const getDayFontColor = (dayOfWeek: number) => {
    if (dayOfWeek === 0) return color.red[600];

    if (dayOfWeek === 6) return color.blue[600];

    return color.black;
  };

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

  return (
    <Days $numberOfWeeks={temp.length / 7}>
      {temp.map(({ fullDate, state, dayOfWeek, day, records, restRecords }) => (
        <li key={fullDate}>
          <Day
            onClick={() => openRecordsDetail(fullDate, records)}
            $isCurrentMonthDay={state === 'cur'}
            $isToday={fullDate === format.date(today)}
            $fontColor={getDayFontColor(dayOfWeek)}
            $hasStudy={records.length > 0}
          >
            {day}
          </Day>
          {restRecords > 0 && (
            <RestRecords onClick={() => notifyRestRecords(fullDate, restRecords)}>+{restRecords}</RestRecords>
          )}
          <Studies>
            {records.slice(0, 3).map(({ studyId, name }) => (
              <Study key={studyId} onClick={() => handleClickStudyItem(studyId)}>
                {name}
              </Study>
            ))}
          </Studies>
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
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto 1fr;
    padding: 5px;

    background-color: ${color.white};
  }
`;

type DayProps = {
  $isCurrentMonthDay: boolean;
  $isToday: boolean;
  $fontColor: string;
  $hasStudy: boolean;
};

const Day = styled.div<DayProps>`
  justify-self: flex-start;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  border-radius: 50%;

  width: 30px;
  height: 30px;

  background-color: ${color.white};

  ${({ $isCurrentMonthDay, $fontColor, $isToday, $hasStudy }) => css`
    opacity: ${$isCurrentMonthDay ? 1 : 0.4};
    color: ${$fontColor};

    background-color: ${$isToday && color.neutral[100]};

    cursor: ${$hasStudy && 'pointer'};
  `}
`;

const RestRecords = styled.div`
  justify-self: flex-end;
  align-self: center;

  display: flex;
  justify-content: center;

  font-size: 1.4rem;

  width: 22px;
  height: 22px;

  border-radius: 50%;
  background-color: ${color.blue[50]};

  cursor: pointer;
`;

const Studies = styled.ul`
  grid-column: 1 / -1;
  align-self: flex-start;

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
