import type { PropsWithChildren } from 'react';
import React from 'react';

import ErrorPage from '@Pages/ErrorPage';

import { ModalContext } from '@Contexts/ModalProvider';

import type { UnknownApiError } from '@Errors/index';
import { ApiError } from '@Errors/index';

type State = {
  hasError: boolean;
  errorMessage: string;
  errorType: string;
  code?: string | null;
};

export default class ErrorBoundary extends React.Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorType: '',
      code: null,
    };
  }

  static getDerivedStateFromError(error: ApiError | UnknownApiError) {
    if (error instanceof ApiError) {
      return { hasError: true, errorMessage: error.message, code: error.code, errorType: error.name };
    }

    return { hasError: true, errorMessage: error.message, errorType: error.name };
  }

  static contextType = ModalContext;

  componentDidCatch(reason: ApiError | UnknownApiError): void {
    const { openAlert } = this.context as ModalContext;

    if (reason instanceof ApiError) {
      return openAlert(reason.message);
    }
  }

  render() {
    if (this.state.errorType === 'Unknown API Error') return <ErrorPage />;

    return this.props.children;
  }
}
