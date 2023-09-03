import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import tokenStorage from '@Utils/tokenStorage';

import { requestGetMemberInfo } from '@Apis/index';

import type { MemberInfo } from '@Types/member';

import { ApiError } from '@Errors/index';

type Actions = {
  initMemberInfo: (memberInfo: MemberInfo) => void;
  clearMemberInfo: () => void;
};

const MemberInfoContext = createContext<{ memberInfo: MemberInfo | null; isLoading: boolean }>({
  memberInfo: null,
  isLoading: false,
});

const MemberInfoActionContext = createContext<Actions | null>(null);

const MemberInfoProvider = ({ children }: PropsWithChildren) => {
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const actions: Actions = useMemo(
    () => ({
      initMemberInfo: (memberInfo: MemberInfo) => {
        setMemberInfo(memberInfo);
      },
      clearMemberInfo: () => {
        tokenStorage.clear();
        setMemberInfo(null);
        navigate(ROUTES_PATH.landing);
      },
    }),
    [navigate],
  );

  const fetchMemberInfo = useCallback(async () => {
    try {
      const { data } = await requestGetMemberInfo();
      actions.initMemberInfo(data);
    } catch (reason) {
      if (reason instanceof ApiError && (reason.code === 1402 || reason.code === 1405)) {
        actions.clearMemberInfo();
        return;
      }

      throw reason;
    } finally {
      setIsLoading(false);
    }
  }, [actions]);

  useEffect(() => {
    if (pathname === ROUTES_PATH.auth) return;

    if (memberInfo) return;

    fetchMemberInfo();
  }, [navigate, pathname, fetchMemberInfo, memberInfo, actions]);

  useEffect(() => {
    if (!memberInfo && !isLoading) {
      navigate(ROUTES_PATH.landing);
    }
  }, [isLoading, memberInfo, navigate]);

  return (
    <MemberInfoContext.Provider value={{ memberInfo, isLoading }}>
      <MemberInfoActionContext.Provider value={actions}>{children}</MemberInfoActionContext.Provider>
    </MemberInfoContext.Provider>
  );
};

export default MemberInfoProvider;

export const useMemberInfo = () => {
  const value = useContext(MemberInfoContext);

  return { data: value.memberInfo, isLoading: value.isLoading };
};

export const useMemberInfoAction = () => {
  const value = useContext(MemberInfoActionContext);

  if (value === null) {
    throw new Error('MemberInfoAction 에러');
  }

  return value;
};
