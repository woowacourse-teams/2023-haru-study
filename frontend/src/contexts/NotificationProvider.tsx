import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { css, keyframes, styled } from 'styled-components';

import color from '@Styles/color';

type Notification = {
  variant: 'success' | 'error';
  message: string;
  id: number;
};

export type NotificationContextType = {
  send: (args: Omit<Notification, 'id'>) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(null);

  const send = (args: Omit<Notification, 'id'>) =>
    setNotifications((prev) => {
      if (!prev) return [{ ...args, id: Date.now() }];
      return [...prev, { ...args, id: Date.now() }];
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
  const ref = useRef<HTMLDivElement>(null);
  // const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   // if()
  // }, []);

  return createPortal(
    <Layout ref={ref}>
      {notifications.map((item) => (
        <Notification key={item.id} {...item} remove={remove} />
      ))}
    </Layout>,
    document.getElementById('notification-root') as HTMLElement,
  );
};

const Notification = ({ remove, variant, id, message }: Notification & { remove: (removeId: number) => void }) => {
  const [notificationAnimation, setNotificationAnimation] = useState<'appear' | 'disAppear'>('appear');

  useEffect(() => {
    const removeNotification = () => {
      return setTimeout(() => remove(id), 2000);
    };
    const changeNotificationAnimation = () => {
      return setTimeout(() => setNotificationAnimation('disAppear'), 1800);
    };

    removeNotification();
    changeNotificationAnimation();

    return () => {
      clearTimeout(removeNotification());
      clearTimeout(changeNotificationAnimation());
    };
  }, [id, remove]);

  return (
    <NotificationLayout variant={variant} key={id} $notificationAnimation={notificationAnimation}>
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
  /* height: 500px; */

  display: flex;
  flex-direction: column;

  gap: 10px;

  transition: height 0.8s ease;

  width: 400px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

type NotificationProps = Pick<Notification, 'variant'> & {
  $notificationAnimation: string;
};

const NOTIFICATION_VARIANT = {
  success: css`
    background-color: ${color.neutral[600]};
  `,
  error: css`
    background-color: ${color.red[500]};
  `,
};

const NotificationAnimation = keyframes`
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

const NotificationLayout = styled.div<NotificationProps>`
  color: ${color.white};

  padding: 10px 20px;
  border-radius: 8px;

  transition: transform 0.2s ease;

  ${({ variant, $notificationAnimation }) => css`
    ${NOTIFICATION_VARIANT[variant]}
    animation: ${$notificationAnimation === 'appear'
      ? NotificationAnimation
      : NotificationDisAppearAnimation} 0.2s ease forwards;
  `}
`;

export const useNotification = () => {
  const value = useContext(NotificationContext);

  if (!value) {
    throw new Error('Notification 에러');
  }

  return value;
};
