import { useState, useCallback } from 'react';

type CopyFunction = (text: string) => Promise<void>;

const useCopyClipBoard = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: CopyFunction = useCallback(
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

  return { isCopy, onCopy };
};

export default useCopyClipBoard;
