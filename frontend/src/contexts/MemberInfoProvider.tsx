import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetch from '@Hooks/api/useFetch';

import { ROUTES_PATH } from '@Constants/routes';

import tokenStorage from '@Utils/tokenStorage';

import { requestGetMemberInfo } from '@Apis/index';

import type { MemberInfo } from '@Types/member';

type Actions = {
  refetchMemberInfo: () => void;
  clearMemberInfo: () => void;
};

const MemberInfoContext = createContext<MemberInfo | null>(null);

const MemberInfoActionContext = createContext<Actions | null>(null);

const MemberInfoProvider = ({ children }: PropsWithChildren) => {
  const { result, clearResult, refetch } = useFetch(() => requestGetMemberInfo(), { errorBoundary: false });
  const memberInfo = result?.data || null;

  console.log(memberInfo);

  const navigate = useNavigate();

  const actions: Actions = useMemo(
    () => ({
      refetchMemberInfo: refetch,
      clearMemberInfo: () => {
        tokenStorage.clear();
        clearResult();
        navigate(ROUTES_PATH.landing);
      },
    }),
    [clearResult, navigate, refetch],
  );

  return (
    <MemberInfoContext.Provider value={memberInfo}>
      <MemberInfoActionContext.Provider value={actions}>{children}</MemberInfoActionContext.Provider>
    </MemberInfoContext.Provider>
  );
};

export default MemberInfoProvider;

export const useMemberInfo = () => useContext(MemberInfoContext);

export const useMemberInfoAction = () => {
  const value = useContext(MemberInfoActionContext);

  if (value === null) {
    throw new Error('MemberInfoAction 에러');
  }

  return value;
};
