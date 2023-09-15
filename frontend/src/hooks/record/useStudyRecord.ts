/* eslint-disable react-hooks/exhaustive-deps */

import useFetch from '@Hooks/api/useFetch';

import { requestGetStudyData, requestGetStudyMembers } from '@Apis/index';

const useStudyRecord = (studyId: string) => {
  // const { result: studyDataResult } = useFetch(() => requestGetStudyData(studyId));
  // return { studyBasicInfo };
};

export default useStudyRecord;
