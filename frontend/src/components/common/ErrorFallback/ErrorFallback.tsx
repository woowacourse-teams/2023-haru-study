import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import color from '@Styles/color';

import ResetIcon from '@Assets/icons/ResetIcon';

import Button from '../Button/Button';
import Typography from '../Typography/Typography';

export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: () => void;
  layoutHeight?: string;
};

const ErrorFallback = ({ error, resetErrorBoundary, layoutHeight = '100vh' }: ErrorFallbackProps) => {
  const errorMessage = error.message || '알 수 없는 에러입니다.';
  return (
    <Layout height={layoutHeight}>
      <Typography variant="h3">문제가 발생했습니다.</Typography>
      <Typography variant="p3">{errorMessage}</Typography>
      <Button $block={false} size="small" variant="secondary" onClick={resetErrorBoundary}>
        <ResetIcon /> 다시 시도하기
      </Button>
      <Link to={'/'} onClick={resetErrorBoundary}>
        홈으로 이동하기
      </Link>
    </Layout>
  );
};

export default ErrorFallback;

const Layout = styled.section<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  a {
    color: ${color.blue[500]};
    text-decoration: underline;
  }
`;