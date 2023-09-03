import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { deleteCookie, hasCookie } from '@Utils/cookie';
import tokenStorage from '@Utils/tokenStorage';

import { requestGetMemberInfo } from '@Apis/index';

import type { MemberInfo } from '@Types/member';

type Actions = {
  initMemberInfo: (memberInfo: MemberInfo) => void;
  clearMemberInfo: () => void;
};

const MemberInfoContext = createContext<MemberInfo | null>(null);

const MemberInfoActionContext = createContext<Actions | null>(null);

const MemberInfoProvider = ({ children }: PropsWithChildren) => {
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const actions: Actions = useMemo(
    () => ({
      initMemberInfo: (memberInfo: MemberInfo) => {
        setMemberInfo(memberInfo);
      },
      clearMemberInfo: () => {
        navigate(ROUTES_PATH.login);
        sessionStorage.removeItem('accessToken');
        deleteCookie('refreshToken');
        setMemberInfo(null);
      },
    }),
    [navigate],
  );

  const fetchMemberInfo = useCallback(async () => {
    const { data } = await requestGetMemberInfo();
    actions.initMemberInfo(data);
  }, [actions]);

  useEffect(() => {
    if (pathname === ROUTES_PATH.auth) return;

    const accessToken = tokenStorage.accessToken;
    const hasRefreshToken = hasCookie('refreshToken');
    if (pathname === ROUTES_PATH.login && (accessToken || hasRefreshToken)) {
      navigate(ROUTES_PATH.landing);
      return;
    }

    if (!accessToken && !hasRefreshToken) {
      actions.clearMemberInfo();
      return;
    }

    if (memberInfo) return;

    fetchMemberInfo();
  }, [navigate, pathname, fetchMemberInfo, memberInfo, actions]);

  return (
    <MemberInfoContext.Provider value={memberInfo}>
      <MemberInfoActionContext.Provider value={actions}>{children}</MemberInfoActionContext.Provider>
    </MemberInfoContext.Provider>
  );
};

export default MemberInfoProvider;

export const useMemberInfo = () => {
  const value = useContext(MemberInfoContext);

  return { data: value };
};

export const useMemberInfoAction = () => {
  const value = useContext(MemberInfoActionContext);

  if (value === null) {
    throw new Error('MemberInfoAction 에러');
  }

  return value;
};
