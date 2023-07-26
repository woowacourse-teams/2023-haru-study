
import { studyBoardHandlers } from './studyBoardHandler';
import { checkParticipantCodeHandlers } from './checkParticipantCodeHandlers';
import { studyMakingHandlers } from './studyMakingHandler';
import { studyRecordHandlers } from './studyRecordHandlers';
import { studyStartHandlers } from './studyStartHandlers';


export const handlers = [
  ...studyMakingHandlers,
  ...studyRecordHandlers,
  ...studyStartHandlers,
  ...checkParticipantCodeHandlers,
  ...studyBoardHandlers,
];
