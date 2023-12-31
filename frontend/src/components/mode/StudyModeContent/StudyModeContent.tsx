import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ROUTES_PATH } from '@Constants/routes';

import StudyModeItem from '../StudyModeItem/StudyModeItem';

const StudyModeContent = () => {
  const navigate = useNavigate();

  const handleClickCreateStudyItem = () => {
    navigate(`${ROUTES_PATH.create}?mode=group`);
  };

  const handleClickStudyParticipationItem = () => {
    navigate(`${ROUTES_PATH.participation}`);
  };

  const handleClickAloneStudyItem = () => {
    navigate(`${ROUTES_PATH.create}?mode=alone`);
  };

  return (
    <Layout>
      <StudyModeItem
        title="스터디 개설하기"
        description="스터디원들을 초대해서 함께 공부하고 싶어요"
        onClick={handleClickCreateStudyItem}
      />
      <StudyModeItem
        title="스터디 참여하기"
        description="스터디장에게 받은 참여코드가 있어요"
        onClick={handleClickStudyParticipationItem}
      />
      <StudyModeItem
        title="혼자 공부하기"
        description="다른 스터디원 없이 혼자 공부하고 싶어요"
        onClick={handleClickAloneStudyItem}
      />
    </Layout>
  );
};

export default StudyModeContent;

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  gap: 30px;
`;
