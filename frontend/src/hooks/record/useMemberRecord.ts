/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import { requestGetMemberStudyListData } from '@Apis/index';

import type { StudyBasicInfo } from '@Types/study';

const useMemberRecord = () => {
  const navigate = useNavigate();

  const memberInfo  = useMemberInfo();
  const [studyList, setStudyList] = useState<StudyBasicInfo[] | null>(null);
  const isLoading = !studyList;

  const fetchMemberRecord = useCallback(async () => {
    if (!memberInfo) return;

    const { data } = await requestGetMemberStudyListData(memberInfo.memberId);

    setStudyList(data.studies);
  }, [memberInfo, navigate]);

  useEffect(() => {
    fetchMemberRecord();
  }, [fetchMemberRecord]);

  return { name: memberInfo?.name, studyList, loginType: memberInfo?.loginType, isLoading };
};

export default useMemberRecord;
