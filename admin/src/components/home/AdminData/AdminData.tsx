import { styled } from 'styled-components';

import { useAdminDataType } from '@Contexts/AdminDataTypeProvider';

import MemberListTable from './MemberListTable/MemberListTable';
import ParticipantCodesListTable from './ParticipantCodesListTable/ParticipantCodesListTable';
import ParticipantsListTable from './ParticipantsListTable/ParticipantsListTable';
import StudiesListTable from './StudiesListTable/StudiesListTable';

const AdminData = () => {
  const { adminDataType } = useAdminDataType();

  return (
    <Layout>
      {adminDataType === 'studies' ? (
        <StudiesListTable url="studies" />
      ) : adminDataType === 'todayDoneStudies' ? (
        <StudiesListTable url="studies/done" />
      ) : adminDataType === 'todayCreatedStudies' ? (
        <StudiesListTable url="studies/created" />
      ) : adminDataType === 'participants' ? (
        <ParticipantsListTable />
      ) : adminDataType === 'participantsCode' ? (
        <ParticipantCodesListTable />
      ) : adminDataType === 'member' ? (
        <MemberListTable />
      ) : (
        adminDataType
      )}
    </Layout>
  );
};

export default AdminData;

const Layout = styled.div`
  margin: auto;
`;
