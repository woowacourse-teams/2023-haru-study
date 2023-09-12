import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import type { MenuItem } from '@Components/common/Menu/Menu';
import Menu from '@Components/common/Menu/Menu';

import { DefaultSkeletonStyle } from '@Styles/common';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo, useMemberInfoAction } from '@Contexts/MemberInfoProvider';

import MenuTrigger from '../MenuTrigger/MenuTrigger';

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    key: 0,
    text: '사용자 피드백',
    onClick: () => {
      window.open('https://forms.gle/gjEejNBaQmbhwh3C8', 'blank');
    },
  },
  {
    key: 1,
    text: 'github',
    onClick: () => {
      window.open('https://github.com/woowacourse-teams/2023-haru-study', 'blank');
    },
  },
];

const MemberProfile = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useMemberInfo();
  const { clearMemberInfo } = useMemberInfoAction();

  if (!data) {
    return <></>;
  }

  if (isLoading)
    return (
      <LoadingImageWrapper>
        <LoadingImage />
      </LoadingImageWrapper>
    );

  const { name, imageUrl, loginType } = data;

  const guestMenu = (
    <Menu.Item onClick={clearMemberInfo} bottomSeparator>
      회원으로 시작하기
    </Menu.Item>
  );

  const memberMenu = (
    <>
      <Menu.Item onClick={() => navigate(ROUTES_PATH.memberRecord)}>스터디 기록</Menu.Item>
      <Menu.Item onClick={clearMemberInfo} bottomSeparator>
        로그아웃
      </Menu.Item>
    </>
  );

  return (
    <Menu
      trigger={<MenuTrigger name={name} imageUrl={imageUrl} loginType={loginType} />}
      $menuListPosition="left"
      $style={css`
        margin: 0 0 0 auto;
        cursor: pointer;
      `}
      $menuListStyle={css`
        top: 46px;
      `}
    >
      {loginType === 'guest' ? guestMenu : memberMenu}
      {DEFAULT_MENU_ITEMS.map(({ key, text, onClick }) => (
        <Menu.Item key={key} onClick={onClick}>
          {text}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MemberProfile;

const LoadingImageWrapper = styled.div`
  padding: 4px;
  margin: 0 0 0 auto;
`;

const LoadingImage = styled.div`
  width: 36px;
  height: 36px;

  border-radius: 50%;

  ${DefaultSkeletonStyle}
`;
