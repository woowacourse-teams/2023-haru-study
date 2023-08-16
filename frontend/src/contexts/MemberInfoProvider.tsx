import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import { boolCheckCookie } from '@Utils/cookie';

import { requestAccessTokenRefresh, requestMemberInfo } from '@Apis/index';

import type { MemberInfo } from '@Types/member';

import { APIError } from '@Errors/index';

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
        setMemberInfo(null);
      },
    }),
    [],
  );

  const fetchAccessTokenRefresh = useCallback(async () => {
    try {
      const hasRefreshToken = boolCheckCookie('refreshToken');

      if (!hasRefreshToken) {
        navigate(ROUTES_PATH.login);
        return;
      }

      const { accessToken } = await requestAccessTokenRefresh();
      sessionStorage.setItem('accessToken', accessToken);
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      alert(error.message);
    }
  }, [navigate]);

  const fetchMemberInfo = useCallback(async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      navigate(ROUTES_PATH.login);
      return;
    }

    try {
      const accessTokenPayload = accessToken.split('.')[1];

      if (!accessTokenPayload) throw new APIError('토큰이 만료되었습니다.', '1402');

      const { sub: memberId } = JSON.parse(atob(accessTokenPayload)) as { sub: string };

      const memberInfo = await requestMemberInfo(accessToken, memberId);
      actions.initMemberInfo(memberInfo);
    } catch (error) {
      if (error instanceof APIError && error.code === '1402') {
        await fetchAccessTokenRefresh();
        await fetchMemberInfo();

        return;
      }
      if (!(error instanceof Error)) throw error;

      alert(error.message);
    }
  }, [actions, fetchAccessTokenRefresh, navigate]);

  useEffect(() => {
    if (pathname === ROUTES_PATH.auth) return;
    if (memberInfo) return;

    fetchMemberInfo();
  }, [navigate, pathname, fetchMemberInfo, memberInfo]);

  return (
    <MemberInfoContext.Provider value={memberInfo}>
      <MemberInfoActionContext.Provider value={actions}>{children}</MemberInfoActionContext.Provider>
    </MemberInfoContext.Provider>
  );
};

export default MemberInfoProvider;

export const useMemberInfo = () => {
  const value = useContext(MemberInfoContext);

  if (value === null) {
    throw new Error('MemberInfo 에러');
  }

  return value;
};

export const useMemberInfoAction = () => {
  const value = useContext(MemberInfoActionContext);

  if (value === null) {
    throw new Error('MemberInfoAction 에러');
  }

  return value;
};
