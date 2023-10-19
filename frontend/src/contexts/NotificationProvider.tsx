import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import Notifications from '@Components/common/Notifications/Notifications';

type NotificationType = 'default' | 'success' | 'error';

export type Notification = {
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

  const remove = useCallback(
    (removedId: number) =>
      setNotifications((prev) => {
        if (!prev) return null;
        return prev.filter(({ id }) => id !== removedId);
      }),
    [],
  );

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

export const useNotification = () => {
  const value = useContext(NotificationContext);

  if (!value) {
    throw new Error('Notification 에러');
  }

  return value;
};
