import { authHandler } from './authHandler';
import { checkParticipantCodeHandlers } from './checkParticipantCodeHandlers';
import { studyBoardHandlers } from './studyBoardHandler';
import { studyMakingHandlers } from './studyMakingHandler';
import { studyRecordHandlers } from './studyRecordHandlers';
import { studyStartHandlers } from './studyStartHandlers';

export const handlers = [
  ...studyMakingHandlers,
  ...studyRecordHandlers,
  ...studyStartHandlers,
  ...checkParticipantCodeHandlers,
  ...studyBoardHandlers,
  ...authHandler,
];
