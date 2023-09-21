import type { ComposeEventHandlers } from '@Types/dom';

export const composeEventHandlers: ComposeEventHandlers = (externalEventHandler, innerEventHandler) => {
  return (event) => {
    externalEventHandler?.(event);
    innerEventHandler?.(event);
  };
};
