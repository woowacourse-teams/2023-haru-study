import { useEffect, type MouseEventHandler, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';

import color from '@Styles/color';

const Modal = ({ children, closeModal }: PropsWithChildren<{ closeModal: () => void }>) => {
  const onClickBackdrop = () => {
    closeModal();
  };

  const preventCloseModal: MouseEventHandler = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return createPortal(
    <Backdrop onClick={onClickBackdrop}>
      <ModalContainer onClick={preventCloseModal}>{children}</ModalContainer>
    </Backdrop>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.4);

  z-index: 5;
`;

const ModalContainer = styled.div`
  padding: 20px;
  border-radius: 8px;

  background-color: ${color.white};

  width: 500px;
  max-height: 600px;
  overflow-y: auto;
`;
