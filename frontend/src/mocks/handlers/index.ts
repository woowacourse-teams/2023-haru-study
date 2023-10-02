import { authHandler } from './authHandler';
import { participantsHandlers } from './participantsHandlers';
import { studyBoardHandlers } from './studyBoardHandler';
import { studyInfoHandlers } from './studyInfoHandlers';
import { studyRecordHandlers } from './studyRecordHandlers';

export const handlers = [
  ...studyInfoHandlers,
  ...participantsHandlers,
  ...studyRecordHandlers,
  ...studyBoardHandlers,
  ...authHandler,
];
