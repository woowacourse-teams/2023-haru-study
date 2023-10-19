import { authHandler } from './authHandler';
import { contentsHandler } from './contentsHandler';
import { participantsHandler } from './participantsHandler';
import { pollingHandler } from './pollingHandler';
import { queryHandler } from './queryHandler';
import { studiesHandler } from './studiesHandler';

export const handlers = [
  ...authHandler,
  ...contentsHandler,
  ...participantsHandler,
  ...pollingHandler,
  ...studiesHandler,
  ...queryHandler,
];
