import type { ComponentType, PropsWithChildren } from 'react';
import { Component } from 'react';

import type { ErrorFallbackProps } from '../ErrorFallback/ErrorFallback';

type ErrorBoundaryProps = {
  fallback: ComponentType<ErrorFallbackProps>;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  resetErrorBoundary = () => {
    this.setState({ error: null });
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { children, fallback: Fallback } = this.props;

    const { error } = this.state;

    if (error) {
      return <Fallback error={error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return children;
  }
}

export default ErrorBoundary;
