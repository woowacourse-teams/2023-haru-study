import { unstable_useBlocker, useNavigate } from 'react-router-dom';

import { useModal } from '@Contexts/ModalProvider';

const useConfirmBeforeRouting = (message: string, onConfirm?: () => void) => {
  const navigate = useNavigate();
  const { openConfirm } = useModal();

  unstable_useBlocker(({ nextLocation }) => {
    const state = nextLocation.state as { block: boolean } | null;
    if (state?.block === false) return false;

    openConfirm(message, () => {
      onConfirm?.();
      navigate(nextLocation, { state: { block: false } });
    });

    return true;
  });
};

export default useConfirmBeforeRouting;
