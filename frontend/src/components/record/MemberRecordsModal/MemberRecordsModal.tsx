import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import { useModal } from '@Contexts/ModalProvider';

import type { StudyBasicInfo } from '@Types/study';

import MemberRecordItem from '../MemberRecordItem/MemberRecordItem';

type Props = {
  fullDate: string;
  studies: StudyBasicInfo[];
  handleClickStudyItem: (studyId: string) => void;
};

const MemberRecordsModal = ({ fullDate, studies, handleClickStudyItem }: Props) => {
  const { closeModal } = useModal();
  return (
    <Layout>
      <Typography variant="h5">{fullDate}</Typography>
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
      <Button variant="secondary" size="x-small" onClick={() => closeModal()} $block={false}>
        확인
      </Button>
    </Layout>
  );
};

export default MemberRecordsModal;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px 10px;

  button {
    align-self: flex-end;
  }
`;

const StudyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
