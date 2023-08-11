import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

type Props = {
  message: string;
  closeModal: () => void;
  onClose?: () => void;
};

const Alert = ({ message, closeModal, onClose }: Props) => {
  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  return (
    <Layout>
      <Typography variant="p3">{message}</Typography>
      <Button variant="secondary" size="x-small" $block={false} onClick={handleClose}>
        확인
      </Button>
    </Layout>
  );
};

export default Alert;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    align-self: flex-end;
  }
`;
