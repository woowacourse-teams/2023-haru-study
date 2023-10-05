import { authHandler } from './authHandler';
import { ContentsHandler } from './contentsHandler';
import { participantsHandler } from './participantsHandler';
import { pollingHandler } from './pollingHandler';
import { studiesHandler } from './studiesHandler';
import { studyRecordHandlers } from './studyRecordHandlers';

export const handlers = [
  ...authHandler,
  ...ContentsHandler,
  ...participantsHandler,
  ...pollingHandler,
  ...studiesHandler,
  ...studyRecordHandlers,
];
