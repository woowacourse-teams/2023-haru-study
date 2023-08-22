import { authHandler } from './authHandler';
import { checkParticipantCodeHandlers } from './checkParticipantCodeHandlers';
import { createStudyHandlers } from './createStudyHandlers';
import { progressesHandlers } from './progressesHandlers';
import { studyBoardHandlers } from './studyBoardHandler';
import { studyRecordHandlers } from './studyRecordHandlers';
import { studyStartHandlers } from './studyStartHandlers';

export const handlers = [
  ...checkParticipantCodeHandlers,
  ...studyBoardHandlers,
  ...createStudyHandlers,
  ...studyRecordHandlers,
  ...studyStartHandlers,
  ...authHandler,
  ...progressesHandlers,
];
