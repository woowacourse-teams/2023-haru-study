import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import { useModal } from '@Contexts/ModalProvider';

import type { StudyInfo } from '@Types/study';

import MemberRecordItem from '../../MemberRecordItem/MemberRecordItem';

type Props = {
  fullDate: string;
  studies: StudyInfo[];
  handleClickStudyItem: (studyId: string) => void;
};

const MemberRecordListModal = ({ fullDate, studies, handleClickStudyItem }: Props) => {
  const { closeModal } = useModal();
  return (
    <Layout>
      <Typography variant="h5">
        <span>{fullDate}</span>
        <Button variant="secondary" size="x-small" onClick={() => closeModal()} $block={false}>
          닫기
        </Button>
      </Typography>
      <StudyList>
        {studies.map((record) => (
          <MemberRecordItem
            key={record.studyId}
            record={record}
            handleClickStudyItem={(studyId) => {
              handleClickStudyItem(studyId);
              closeModal();
            }}
          />
        ))}
      </StudyList>
    </Layout>
  );
};

export default MemberRecordListModal;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 10px;

  button {
    align-self: flex-end;
    font-weight: 300;
  }

  h5 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StudyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-height: 600px;
  overflow-y: auto;

  overflow: auto;
`;
