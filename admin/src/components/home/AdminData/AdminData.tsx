import { styled } from 'styled-components';

import { useAdminDataType } from '@Contexts/AdminDataTypeProvider';

import StudiesListTable from './StudiesListTable/StudiesListTable';

const AdminData = () => {
  const { adminDataType } = useAdminDataType();

  return <Layout>{adminDataType === 'studies' ? <StudiesListTable /> : adminDataType}</Layout>;
};

export default AdminData;

const Layout = styled.div`
  margin: auto;
`;
