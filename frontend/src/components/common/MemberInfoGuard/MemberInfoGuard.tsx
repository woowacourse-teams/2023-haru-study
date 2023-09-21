import type { PropsWithChildren } from 'react';

import LoadingFallback from '@Components/common/LodingFallback/LoadingFallback';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

const MemberInfoGuard = ({ children }: PropsWithChildren) => {
  const memberInfo = useMemberInfo();

  if (memberInfo === null) return <LoadingFallback height="100vh" />;

  return children;
};

export default MemberInfoGuard;
