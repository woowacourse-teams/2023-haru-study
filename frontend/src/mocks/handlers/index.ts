import { authHandler } from './authHandler';
import { checkParticipantCodeHandlers } from './checkParticipantCodeHandlers';
import { createStudyHandlers } from './createStudyHandlers';
import { progressesHandlers } from './progressesHandlers';
import { studyBoardHandlers } from './studyBoardHandler';
import { studyRecordHandlers } from './studyRecordHandlers';

export const handlers = [
  ...studyRecordHandlers,
  ...studyBoardHandlers,
  ...createStudyHandlers,
  ...checkParticipantCodeHandlers,
  ...progressesHandlers,
  ...authHandler,
];
