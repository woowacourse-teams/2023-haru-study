import { styled, css } from 'styled-components';

import Button from '@Components/common/Button/Button';

import { useDatePicker } from '../DatePickerContext/DatePickerProvider';

const ConfirmCancelButton = () => {
  const { startDate, endDate, onClickCancel, onClickConfirm } = useDatePicker();

  return (
    <Layout>
      <Button
        variant="outlined"
        size="x-small"
        $style={css`
          border: none;
        `}
        $block={false}
        onClick={onClickCancel}
      >
        취소
      </Button>
      <Button
        variant="primary"
        size="x-small"
        $block={false}
        onClick={() => {
          if (onClickConfirm) onClickConfirm(startDate, endDate);
        }}
      >
        확인
      </Button>
    </Layout>
  );
};

export default ConfirmCancelButton;

const Layout = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;

  margin-top: 20px;
`;
