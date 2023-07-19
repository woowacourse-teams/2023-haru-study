import { setupWorker } from 'msw';

import { handlers } from './handlers';
import { studyRecordHandlers } from './studyRecordHandlers';

export const worker = setupWorker(...handlers, ...studyRecordHandlers);
