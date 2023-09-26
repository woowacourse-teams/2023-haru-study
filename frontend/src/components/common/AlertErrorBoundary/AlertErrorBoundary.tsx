import type { PropsWithChildren } from 'react';
import { Component } from 'react';

import type { ModalContextType } from '@Contexts/ModalProvider';
import { ModalContext } from '@Contexts/ModalProvider';

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

  static contextType = ModalContext;

  componentDidCatch(error: Error): void {
    const { openAlert } = this.context as ModalContextType;

    openAlert(error.message);
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default AlertErrorBoundary;
