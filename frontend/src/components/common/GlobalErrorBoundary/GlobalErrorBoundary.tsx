import type { ComponentType, PropsWithChildren } from 'react';
import { Component } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import tokenStorage from '@Utils/tokenStorage';

import { ApiError } from '@Errors/index';

import type { ErrorFallbackProps } from '../ErrorFallback/ErrorFallback';

type ErrorBoundaryProps = {
  fallback: ComponentType<ErrorFallbackProps>;
  navigate: NavigateFunction;
};

type ErrorBoundaryState = {
  error: Error | null;
  errorCase: 'unauthorized' | 'default' | null;
};

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
    errorCase: null,
  };

  resetErrorBoundary = () => {
    this.setState({ error: null, errorCase: null });
  };

  static getDerivedStateFromError(error: Error) {
    if (error instanceof ApiError) {
      if (error.code === 1402 || error.code === 1405) {
        return { error, errorCase: 'unauthorized' };
      }
    }

    return { error, errorCase: 'default' };
  }

  componentDidCatch(): void {
    const { navigate } = this.props;
    const { errorCase } = this.state;

    if (errorCase === 'unauthorized') {
      tokenStorage.clear();
      alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
      navigate(ROUTES_PATH.landing);
    }
  }

  render() {
    const { children, fallback: Fallback } = this.props;

    const { error, errorCase } = this.state;

    if (errorCase === 'default' && error) {
      return <Fallback error={error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return children;
  }
}

const GlobalErrorBoundary = ({
  children,
  fallback,
}: PropsWithChildren<{ fallback: ComponentType<ErrorFallbackProps> }>) => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary fallback={fallback} navigate={navigate}>
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
