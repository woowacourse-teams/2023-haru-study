import { useEffect, useState } from 'react';
import { styled, css, keyframes } from 'styled-components';

import color from '@Styles/color';

import type { Notification } from '@Contexts/NotificationProvider';

type Props = Notification & { remove: (removeId: number) => void };

const NotificationItem = ({ remove, type, id, message }: Props) => {
  const [notificationAnimation, setNotificationAnimation] = useState<'appear' | 'disappear'>('appear');

  useEffect(() => {
    const removeNotification = setTimeout(() => remove(id), 2000);
    const changeNotificationAnimation = setTimeout(() => setNotificationAnimation('disappear'), 1800);

    return () => {
      clearTimeout(removeNotification);
      clearTimeout(changeNotificationAnimation);
    };
  }, [id, remove]);

  return (
    <Layout type={type} key={id} $notificationAnimation={notificationAnimation}>
      {message}
    </Layout>
  );
};

export default NotificationItem;

type NotificationProps = Pick<Notification, 'type'> & {
  $notificationAnimation: 'appear' | 'disappear';
};

const NOTIFICATION_TYPE = {
  default: css`
    background-color: ${color.neutral[600]};
  `,
  success: css`
    background-color: #239d2d;
  `,
  error: css`
    background-color: #e63f42;
  `,
} as const;

const NotificationAppearAnimation = keyframes`
    0% {
      transform: translateY(20px);
      opacity: 0.2;
    }
  
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;

const NotificationDisAppearAnimation = keyframes`
    0% {
      transform: translateY(0);
      opacity: 1;
    }
  
    100% {
      transform: translateY(10px);
      opacity: 0;
    }
  `;

const NOTIFICATION_ANIMATION = {
  appear: css`
    animation: ${NotificationAppearAnimation} 0.2s ease forwards;
  `,
  disappear: css`
    animation: ${NotificationDisAppearAnimation} 0.2s ease forwards;
  `,
} as const;

const Layout = styled.div<NotificationProps>`
  color: ${color.white};

  text-align: center;

  word-break: keep-all;
  white-space: pre-line;

  padding: 10px 20px;
  border-radius: 8px;

  ${({ type, $notificationAnimation }) => css`
    ${NOTIFICATION_TYPE[type]}
    ${NOTIFICATION_ANIMATION[$notificationAnimation]}
  `}
`;
