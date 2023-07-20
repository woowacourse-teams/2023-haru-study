import { studyMakingHandlers } from './studyMakingHandler';
import { studyRecordHandlers } from './studyRecordHandlers';

export const handlers = [...studyMakingHandlers, ...studyRecordHandlers];
