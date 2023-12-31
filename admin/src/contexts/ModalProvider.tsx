import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import Modal from '@Components/home/Modal/Modal';

export type ModalContextType = {
  isOpen: boolean;
  openModal: (modalContents: ReactNode) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalContents, setModalContents] = useState<ReactNode | null>(null);

  const isOpen = Boolean(modalContents);

  const openModal = useCallback((modalContents: ReactNode) => setModalContents(modalContents), []);

  const closeModal = useCallback(() => setModalContents(null), []);

  const value = {
    isOpen,
    openModal,
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
