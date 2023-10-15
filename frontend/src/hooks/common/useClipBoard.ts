import { useState, useCallback } from 'react';

const useClipBoard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    },
    [setIsCopied],
  );

  return { isCopied, copy };
};

export default useClipBoard;
