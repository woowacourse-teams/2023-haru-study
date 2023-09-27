import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { css, keyframes, styled } from 'styled-components';

import color from '@Styles/color';

type NotificationType = 'default' | 'success' | 'error';

type Notification = {
  type: NotificationType;
  message: string;
  id: number;
};

export type NotificationContextType = {
  send: (args: Partial<Omit<Notification, 'id'>>) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(null);

  const send = ({ type = 'default', message = '' }: Partial<Omit<Notification, 'id'>>) =>
    setNotifications((prev) => {
      if (!prev) return [{ type, message, id: Date.now() }];
      return [...prev, { type, message, id: Date.now() }];
    });

  const remove = (removedId: number) =>
    setNotifications((prev) => {
      if (!prev) return null;
      return prev.filter(({ id }) => id !== removedId);
    });

  const value = {
    send,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications && <Notifications notifications={notifications} remove={remove} />}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

type Props = {
  notifications: Notification[];
  remove: (removeId: number) => void;
};

const Notifications = ({ notifications, remove }: Props) => {
  return createPortal(
    <Layout>
      {notifications.map((item) => (
        <Notification key={item.id} {...item} remove={remove} />
      ))}
    </Layout>,
    document.getElementById('notification-root') as HTMLElement,
  );
};

const Notification = ({ remove, type, id, message }: Notification & { remove: (removeId: number) => void }) => {
  const [notificationAnimation, setNotificationAnimation] = useState<'appear' | 'disappear'>('appear');

  useEffect(() => {
    const removeNotification = () => {
      return setTimeout(() => remove(id), 2000);
    };
    const changeNotificationAnimation = () => {
      return setTimeout(() => setNotificationAnimation('disappear'), 1800);
    };

    removeNotification();
    changeNotificationAnimation();

    return () => {
      clearTimeout(removeNotification());
      clearTimeout(changeNotificationAnimation());
    };
  }, [id, remove]);

  return (
    <NotificationLayout type={type} key={id} $notificationAnimation={notificationAnimation}>
      {message}
    </NotificationLayout>
  );
};

const Layout = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  gap: 10px;

  transition: min-height 0.2s ease;

  width: 400px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

type NotificationProps = Pick<Notification, 'type'> & {
  $notificationAnimation: 'appear' | 'disappear';
};

const NOTIFICATION_TYPE = {
  default: css`
    background-color: ${color.neutral[600]};
  `,
  success: css`
    background-color: ${color.neutral[600]};
  `,
  error: css`
    background-color: ${color.red[500]};
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

const NotificationLayout = styled.div<NotificationProps>`
  color: ${color.white};

  padding: 10px 20px;
  border-radius: 8px;

  ${({ type, $notificationAnimation }) => css`
    ${NOTIFICATION_TYPE[type]}
    ${NOTIFICATION_ANIMATION[$notificationAnimation]}
  `}
`;

export const useNotification = () => {
  const value = useContext(NotificationContext);

  if (!value) {
    throw new Error('Notification 에러');
  }

  return value;
};
