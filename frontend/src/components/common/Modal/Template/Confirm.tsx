import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

type Props = {
  message: string;
  closeModal: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
};

const Confirm = ({ message, closeModal, onConfirm, onCancel }: Props) => {
  const handleConfirm = () => {
    closeModal();
    onConfirm();
  };

  const handleCancel = () => {
    closeModal();
    onCancel?.();
  };

  return (
    <Layout>
      <Typography variant="p3">{message}</Typography>
      <ButtonContainer>
        <ConfirmButton variant="outlined" size="x-small" $block={false} onClick={handleConfirm}>
          확인
        </ConfirmButton>
        <CancelButton variant="outlined" size="x-small" onClick={handleCancel}>
          취소
        </CancelButton>
      </ButtonContainer>
    </Layout>
  );
};

export default Confirm;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 4px;
`;

const ConfirmButton = styled(Button)`
  width: fit-content;

  border: none;
  color: ${color.blue[500]};

  &:hover:enabled {
    background-color: ${color.blue[50]};
  }
`;

const CancelButton = styled(Button)`
  width: fit-content;

  color: ${color.neutral[500]};

  border: none;
`;
