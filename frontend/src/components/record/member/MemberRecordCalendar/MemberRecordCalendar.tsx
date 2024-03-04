import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Calendar from '@Components/common/Calendar/Calendar/Calendar';
import useMemberCalendarRecord from '@Components/record/hooks/useMemberCalendarRecord';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { useModal } from '@Contexts/ModalProvider';
import { useNotification } from '@Contexts/NotificationProvider';

import format from '@Utils/format';

import MemberRecordListModal from '../MemberRecordListModal/MemberRecordListModal';

type Props = {
  memberId: string;
};

const MemberRecordCalendar = ({ memberId }: Props) => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { send } = useNotification();

  const { year, month, calendarData, isLoading, getStudies, updateYearMonth } = useMemberCalendarRecord(memberId);

  const handleClickStudyItem = (studyId: string) => navigate(`${ROUTES_PATH.record}/${studyId}`);

  const handleOpenMemberRecordListModal = (date: Date) => {
    const studies = getStudies(date);
    const fullDate = format.date(date);

    if (studies.length === 0) {
      send({
        type: 'error',
        message: `${fullDate}에 진행한 스터디가 없어요.`,
      });
      return;
    }

    openModal(
      <MemberRecordListModal
        fullDate={format.date(date)}
        studies={getStudies(date)}
        handleClickStudyItem={handleClickStudyItem}
      />,
    );
  };

  return (
    <Calendar
      year={year}
      month={month}
      limit={3}
      dataLoading={isLoading}
      onClickDay={handleOpenMemberRecordListModal}
      onClickRestDataCount={handleOpenMemberRecordListModal}
      onClickTotalDataCount={handleOpenMemberRecordListModal}
      onChangeCalendar={(year, month) => updateYearMonth(year, month)}
    >
      {calendarData?.map((item) => (
        <Calendar.Item key={item.studyId} date={new Date(item.createdDate)}>
          <Record onClick={() => handleClickStudyItem(item.studyId)}>{item.name}</Record>
        </Calendar.Item>
      ))}
    </Calendar>
  );
};

export default MemberRecordCalendar;

const Record = styled.div`
  padding: 2px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  background-color: ${color.neutral[100]};
  border-radius: 5px;

  cursor: pointer;
`;
