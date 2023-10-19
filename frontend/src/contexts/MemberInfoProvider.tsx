import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetch from '@Hooks/api/useFetch';
import usePreFetch from '@Hooks/api/usePreFetch';

import { ROUTES_PATH } from '@Constants/routes';

import calendar from '@Utils/calendar';
import format from '@Utils/format';
import tokenStorage from '@Utils/tokenStorage';
import url from '@Utils/url';

import { requestGetMemberCalendarRecord, requestGetMemberInfo, requestPostLogout } from '@Apis/index';

import type { MemberInfo } from '@Types/member';

type Actions = {
  refetchMemberInfo: () => void;
  clearMemberInfo: () => void;
};

const MemberInfoContext = createContext<MemberInfo | null>(null);

const MemberInfoActionContext = createContext<Actions | null>(null);

const MemberInfoProvider = ({ children }: PropsWithChildren) => {
  const { result, clearResult, refetch } = useFetch(() => requestGetMemberInfo(), {
    errorBoundary: false,
    enabled: url.getPathName() !== ROUTES_PATH.auth,
  });

  const { prefetch } = usePreFetch();

  const navigate = useNavigate();

  const memberInfo = result?.data || null;

  useEffect(() => {
    if (!memberInfo || memberInfo.loginType === 'guest') return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const [startDate, endDate] = calendar.getMonthFirstLastDate(year, month).map((date) => {
      if (!date) return '';

      return format.date(date.date, '-');
    });

    prefetch(() => requestGetMemberCalendarRecord(memberInfo.memberId, startDate, endDate), {
      cacheKey: [startDate, endDate],
      cacheTime: 60 * 60 * 1000,
    });
  }, [memberInfo, prefetch]);

  const actions: Actions = useMemo(
    () => ({
      refetchMemberInfo: refetch,
      clearMemberInfo: () => {
        tokenStorage.removeAccessToken();
        requestPostLogout();
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
