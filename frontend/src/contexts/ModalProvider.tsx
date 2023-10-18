import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import Modal from '@Components/common/Modal/Modal';
import Alert from '@Components/common/Modal/Template/Alert';
import Confirm from '@Components/common/Modal/Template/Confirm';

export type ModalContextType = {
  isOpen: boolean;
  openModal: (modalContents: ReactNode) => void;
  openAlert: (message: string, onClose?: () => void) => void;
  openConfirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalContents, setModalContents] = useState<ReactNode | null>(null);

  const isOpen = Boolean(modalContents);

  const openModal = useCallback((modalContents: ReactNode) => setModalContents(modalContents), []);

  const closeModal = useCallback(() => setModalContents(null), []);

  const openAlert = useCallback(
    (message: string, onClose?: () => void) =>
      setModalContents(<Alert message={message} closeModal={closeModal} onClose={onClose} />),
    [closeModal],
  );

  const openConfirm = useCallback(
    (message: string, onConfirm: () => void, onCancel?: () => void) =>
      setModalContents(<Confirm message={message} closeModal={closeModal} onConfirm={onConfirm} onCancel={onCancel} />),
    [closeModal],
  );

  const value = {
    isOpen,
    openModal,
    openAlert,
    openConfirm,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && <Modal closeModal={closeModal}>{modalContents}</Modal>}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => {
  const value = useContext(ModalContext);

  if (value === null) {
    throw new Error('Modal 에러');
  }

  return value;
};
