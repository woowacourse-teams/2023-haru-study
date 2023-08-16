import useMemberRecord from '@Hooks/record/useMemberRecord';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

const MemberRecordContents = () => {
  const { name, studyList, isLoading } = useMemberRecord({
    errorHandler: (error) => alert(error.message),
  });
  console.log(name, studyList, isLoading);
  return (
    <>
      <div>이름님의 스터디 기록</div>
      <div>스터디 목록</div>
    </>
  );
};

export default MemberRecordContents;
