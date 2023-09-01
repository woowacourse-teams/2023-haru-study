import { useNavigate } from 'react-router-dom';
import { css } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import useMemberRecord from '@Hooks/record/useMemberRecord';

import { TextSkeletonStyle } from '@Styles/common';

import MemberRecordList from '../MemberRecordList/MemberRecordList';

const MemberRecordContents = () => {
  const navigate = useNavigate();

  const { name, studyList, isLoading, loginType } = useMemberRecord();

  if (loginType === 'guest') {
    navigate('/404');
  }

  return (
    <>
      <Typography
        variant="h2"
        $style={css`
          font-weight: 600;

          ${isLoading &&
          css`
            width: 80%;
            min-width: 400px;
            ${TextSkeletonStyle}
          `}
        `}
      >
        {name}님의 스터디 기록
      </Typography>
      <MemberRecordList studyList={studyList} isLoading={isLoading} />
    </>
  );
};

export default MemberRecordContents;
