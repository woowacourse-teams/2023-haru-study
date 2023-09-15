import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import { TextSkeletonStyle } from '@Styles/common';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import MemberRecordList from '../MemberRecordList/MemberRecordList';
import MemberRecordListSkeleton from '../MemberRecordList/MemberRecordListSkeleton';

const MemberRecordContents = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useMemberInfo();
  const memberId = data?.memberId;

  if (data?.loginType === 'guest') {
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
        {data?.name}님의 스터디 기록
      </Typography>
      <Suspense fallback={<MemberRecordListSkeleton />}>
        {memberId && <MemberRecordList memberId={memberId} />}
      </Suspense>
    </>
  );
};

export default MemberRecordContents;
