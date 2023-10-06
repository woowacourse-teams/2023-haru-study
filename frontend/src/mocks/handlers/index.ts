import { authHandler } from './authHandler';
import { contentsHandler } from './contentsHandler';
import { participantsHandler } from './participantsHandler';
import { pollingHandler } from './pollingHandler';
import { queryHandlers } from './qeuryHandlers';
import { studiesHandler } from './studiesHandler';

export const handlers = [
  ...authHandler,
  ...contentsHandler,
  ...participantsHandler,
  ...pollingHandler,
  ...studiesHandler,
  ...queryHandlers,
];
