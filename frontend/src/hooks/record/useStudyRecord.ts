/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import { requestGetStudyData, requestGetStudyMembers } from '@Apis/index';

import type { Member, StudyBasicInfo } from '@Types/study';

const useStudyRecord = (studyId: string, options?: { errorHandler: (error: Error) => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [studyBasicInfo, setStudyBasicInfo] = useState<StudyBasicInfo | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const { studyName, timePerCycle, totalCycle } = await requestGetStudyData(studyId);
      const { members } = await requestGetStudyMembers(studyId);

      setStudyBasicInfo({
        studyName,
        timePerCycle,
        totalCycle,
      });
      setMembers(members);
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      options?.errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, studyBasicInfo, members };
};

export default useStudyRecord;
