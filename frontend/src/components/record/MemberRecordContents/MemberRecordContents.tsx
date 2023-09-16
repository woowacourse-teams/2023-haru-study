import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import MemberRecordList from '../MemberRecordList/MemberRecordList';
import MemberRecordListSkeleton from '../MemberRecordList/MemberRecordListSkeleton';

const MemberRecordContents = () => {
  const navigate = useNavigate();

  const memberInfo = useMemberInfo();
  const memberId = memberInfo?.memberId;

  if (memberInfo?.loginType === 'guest') {
    navigate('/404');
  }

  return (
    <>
      <Typography
        variant="h2"
        $style={css`
          font-weight: 600;
        `}
      >
        {memberInfo?.name}님의 스터디 기록
      </Typography>
      <Suspense fallback={<MemberRecordListSkeleton />}>
        {memberId && <MemberRecordList memberId={memberId} />}
      </Suspense>
    </>
  );
};

export default MemberRecordContents;
