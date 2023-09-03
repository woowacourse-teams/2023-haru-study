/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import { requestGetStudyData, requestGetStudyMembers } from '@Apis/index';

import type { MemberProgress, StudyBasicInfo } from '@Types/study';

const useStudyRecord = (studyId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [studyBasicInfo, setStudyBasicInfo] = useState<StudyBasicInfo | null>(null);
  const [memberProgresses, setMemberProgresses] = useState<MemberProgress[]>([]);

  const setInitInfo = (
    { studyId, name, timePerCycle, totalCycle, createdDateTime }: StudyBasicInfo,
    members: MemberProgress[],
  ) => {
    setStudyBasicInfo({
      studyId,
      name,
      timePerCycle,
      totalCycle,
      createdDateTime,
    });
    setMemberProgresses(members);
  };

  const fetchStudyRecordData = useCallback(async () => {
    setIsLoading(true);

    const { data: basicInfo } = await requestGetStudyData(studyId);
    const { data } = await requestGetStudyMembers(studyId);

    setInitInfo(basicInfo, data.progresses);

    setIsLoading(false);
  }, [studyId]);

  useEffect(() => {
    fetchStudyRecordData();
  }, [fetchStudyRecordData]);

  return { isLoading, studyBasicInfo, memberProgresses, refetchStudyRecordData: fetchStudyRecordData };
};

export default useStudyRecord;
