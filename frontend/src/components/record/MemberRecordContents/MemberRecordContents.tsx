import { useMemberInfo } from '@Contexts/MemberInfoProvider';

const MemberRecordContents = () => {
  const { data } = useMemberInfo();
  return (
    <>
      <div>이름님의 스터디 기록</div>
      <div>스터디 목록</div>
    </>
  );
};

export default MemberRecordContents;
