/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { requestGetStudyMetadata } from '@Apis/index';

import type { Member, StudyBasicInfo } from '@Types/study';

const useStudyRecord = (studyId: string, options?: { errorHandler: (message: string) => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [studyBasicInfo, setStudyBasicInfo] = useState<StudyBasicInfo | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const fetchData = async () => {
    try {
      const { studyName, timePerCycle, totalCycle, members } = await requestGetStudyMetadata(studyId);

      setStudyBasicInfo({
        studyName,
        timePerCycle,
        totalCycle,
      });
      setMembers(members);
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      options?.errorHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [studyId]);

  return { isLoading, studyBasicInfo, members };
};

export default useStudyRecord;
