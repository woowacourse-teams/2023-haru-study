import { authHandler } from './authHandler';
import { contentsHandler } from './contentsHandler';
import { participantsHandler } from './participantsHandler';
import { pollingHandler } from './pollingHandler';
import { studiesHandler } from './studiesHandler';
import { studyRecordHandlers } from './studyRecordHandlers';

export const handlers = [
  ...authHandler,
  ...contentsHandler,
  ...participantsHandler,
  ...pollingHandler,
  ...studiesHandler,
  ...studyRecordHandlers,
];
