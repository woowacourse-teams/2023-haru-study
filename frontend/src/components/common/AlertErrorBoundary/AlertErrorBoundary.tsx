import type { PropsWithChildren } from 'react';
import { Component } from 'react';

import { NotificationContext, type NotificationContextType } from '@Contexts/NotificationProvider';

import { ApiError } from '@Errors/index';

type AlertErrorBoundaryState = {
  error: Error | null;
};

class AlertErrorBoundary extends Component<PropsWithChildren, AlertErrorBoundaryState> {
  state: AlertErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    if (error instanceof ApiError) {
      if (error.code === 1402 || error.code === 1405) {
        throw error;
      }
    }
    return { error: error };
  }

  static contextType = NotificationContext;

  componentDidCatch(error: Error): void {
    const { send } = this.context as NotificationContextType;

    send({
      type: 'error',
      message: error.message,
    });
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default AlertErrorBoundary;
