import { styled } from 'styled-components';

import { useAdminDataType } from '@Contexts/AdminDataTypeProvider';

const SideNav = () => {
  const { changeAdminDataType } = useAdminDataType();

  return (
    <Layout>
      <NavItem onClick={() => changeAdminDataType('studies')}>전체 스터디 조회</NavItem>
      <NavItem onClick={() => changeAdminDataType('todayDoneStudies')}>오늘 완료된 스터디 조회</NavItem>
      <NavItem onClick={() => changeAdminDataType('todayCreatedStudies')}>오늘 생성된 스터디 조회</NavItem>
      <NavItem onClick={() => changeAdminDataType('participants')}>참여자 정보 조회</NavItem>
      <NavItem onClick={() => changeAdminDataType('participantsCode')}>참여 코드 조회</NavItem>
      <NavItem onClick={() => changeAdminDataType('memberUser')}>회원 유저 조회</NavItem>
      <NavItem onClick={() => changeAdminDataType('guestUser')}>비회원 유저 조회</NavItem>
      <NavItem onClick={() => changeAdminDataType('contents')}>컨텐츠 조회</NavItem>
    </Layout>
  );
};

export default SideNav;

const Layout = styled.nav`
  display: flex;
  flex-direction: column;

  width: 250px;
  height: 100vh;
  border-right: 1px solid #e5e5e5;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60px;

  font-size: 1.2rem;
  color: #000000;

  text-decoration: none;
  border-bottom: 1px solid #e5e5e5;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;
