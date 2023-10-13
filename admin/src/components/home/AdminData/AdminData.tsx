import { styled } from 'styled-components';

import { useAdminDataType } from '@Contexts/AdminDataTypeProvider';

const AdminData = () => {
  const { adminDataType } = useAdminDataType();

  return <Layout>{adminDataType}</Layout>;
};

export default AdminData;

const Layout = styled.div`
  margin: auto;
`;
