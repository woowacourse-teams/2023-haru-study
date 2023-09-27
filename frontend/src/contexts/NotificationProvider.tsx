import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

type Notification = {
  variant: 'success' | 'error';
  message: string;
};

export type NotificationContextType = {
  send: (args: Notification) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(null);

  const send = (args: Notification) =>
    setNotifications((prev) => {
      if (!prev) return [args];
      return [...prev, args];
    });

  const value = {
    send,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications && <Notifications notifications={notifications} />}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

type Props = {
  notifications: Notification[];
};

const Notifications = ({ notifications }: Props) => {
  return (
    <div>
      {notifications.map((item, index) => (
        <div key={index}>{item.message}</div>
      ))}
    </div>
  );
};

export const useNotification = () => {
  const value = useContext(NotificationContext);

  if (!value) {
    throw new Error('Notification 에러');
  }

  return value;
};
