import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import Modal from '@Components/common/Modal/Modal';
import Alert from '@Components/common/Modal/Template/Alert';

type ModalContext = {
  isOpen: boolean;
  openModal: (modalContents: ReactNode) => void;
  openAlert: (message: string, onClose?: () => void) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContext | null>(null);

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

  const value = {
    isOpen,
    openModal,
    openAlert,
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
