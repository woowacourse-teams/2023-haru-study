import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { requestGetStudyMetadata } from '@Apis/index';

import type { Member, StudyBasicInfo } from '@Types/study';

import MemberRecordList from '../MemberRecordList/MemberRecordList';
import StudyInformation from '../StudyInformation/StudyInformation';

const RecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const [studyBasicInfo, setStudyBasicInfo] = useState<StudyBasicInfo | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!studyId) throw Error('잘못된 접근입니다.');

      const { studyName, timePerCycle, totalCycle, members } = await requestGetStudyMetadata(studyId);

      setStudyBasicInfo({
        studyName,
        timePerCycle,
        totalCycle,
      });
      setMembers(members);
    };

    try {
      fetchData();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      alert(error.message);
    }
  }, [studyId]);

  return (
    <RecordContentsLayout>
      <StudyInformation
        studyName={studyBasicInfo?.studyName}
        totalCycle={studyBasicInfo?.totalCycle}
        timePerCycle={studyBasicInfo?.timePerCycle}
        $isLoading={!studyBasicInfo}
      />
      <MemberRecordList studyId={studyId} members={members} />
    </RecordContentsLayout>
  );
};

const RecordContentsLayout = styled.div`
  display: grid;
  row-gap: 40px;

  max-width: 1200px;

  margin: 0 auto;
  padding: 0px 60px;
  padding-bottom: 60px;
`;

export default RecordContents;
