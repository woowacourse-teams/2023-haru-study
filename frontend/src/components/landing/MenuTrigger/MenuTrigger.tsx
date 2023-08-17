import { useState } from 'react';
import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';
import { DefaultSkeletonStyle } from '@Styles/common';

import UserProfileIcon from '@Assets/icons/UserProfileIcon';

import type { AuthProvider } from '@Types/auth';

type Props = {
  name: string;
  loginType: AuthProvider;
  imageUrl: string | null;
};

const MenuTrigger = ({ loginType, imageUrl, name }: Props) => {
  const [profileImageLoading, setProfileImageLoading] = useState(true);

  const displayName = loginType === 'guest' ? name.toUpperCase() : name;

  const triggerImage =
    loginType === 'guest' || !imageUrl ? (
      <GuestProfileWrapper>
        <UserProfileIcon color={color.neutral[800]} />
      </GuestProfileWrapper>
    ) : (
      <UserProfileImage
        src={imageUrl}
        alt="사용자 프로필 이미지"
        $isLoading={profileImageLoading}
        onLoad={() => setProfileImageLoading(false)}
      />
    );

  return (
    <Layout>
      <Typography variant="p3">{displayName}</Typography>
      {triggerImage}
    </Layout>
  );
};

export default MenuTrigger;

const Layout = styled.div`
  justify-self: flex-end;
  display: flex;
  gap: 10px;

  align-items: center;

  p {
    font-size: 2rem;
    font-weight: 400;
  }

  svg {
    width: 34px;
    height: 34px;
  }
`;

type UserProfileImageProps = {
  $isLoading: boolean;
};

const UserProfileImage = styled.img<UserProfileImageProps>`
  width: 36px;
  height: 36px;

  border-radius: 50%;

  ${({ $isLoading }) => css`
    ${$isLoading && DefaultSkeletonStyle}
  `}
`;

const GuestProfileWrapper = styled.div`
  padding: 2px;
  background-color: ${color.neutral[100]};
  border-radius: 50%;
`;
