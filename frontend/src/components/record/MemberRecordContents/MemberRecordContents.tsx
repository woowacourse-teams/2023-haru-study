import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, css } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import { TextSkeletonStyle } from '@Styles/common';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import MemberRecordList from '../MemberRecordList/MemberRecordList';

const MemberRecordContents = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useMemberInfo();

  // data 옵션널 제거 필요
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
      <Suspense
        fallback={
          <SkeletonLayout>
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </SkeletonLayout>
        }
      >
        {/*  data 옵션널 제거 필요 */}
        <MemberRecordList memberId={data?.memberId} />
      </Suspense>
    </>
  );
};

export default MemberRecordContents;

const SkeletonLayout = styled.div`
  display: grid;
  row-gap: 40px;

  max-width: 1200px;
`;

const SkeletonItem = styled.div`
  height: 130px;
  ${TextSkeletonStyle}
`;
