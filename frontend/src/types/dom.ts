export type EventHandler<E> = (e: E) => void;

export type ComposeEventHandlers = <E>(
  externalEventHandler?: EventHandler<E>,
  innerEventHandler?: EventHandler<E>,
) => EventHandler<E>;
