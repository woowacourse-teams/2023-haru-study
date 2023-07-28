import { useState, useCallback } from 'react';

type CopyFunction = (text: string) => Promise<void>;

const useClipBoard = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const copy: CopyFunction = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopy(true);
      } catch (error) {
        setIsCopy(false);
        console.error(error);
      }
    },
    [setIsCopy],
  );

  return { isCopy, copy };
};

export default useClipBoard;
