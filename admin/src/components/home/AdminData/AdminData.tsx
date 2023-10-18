import { styled } from 'styled-components';

import { useAdminDataType } from '@Contexts/AdminDataTypeProvider';

import StudiesListTable from './StudiesListTable/StudiesListTable';

const AdminData = () => {
  const { adminDataType } = useAdminDataType();

  return (
    <Layout>
      {adminDataType === 'studies' ? (
        <StudiesListTable url="studies" />
      ) : adminDataType === 'todayDoneStudies' ? (
        <StudiesListTable url="studies/done" />
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
