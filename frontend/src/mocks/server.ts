import { setupServer } from 'msw/node';

import { handlers } from './handlers';
import { studyRecordHandlers } from './studyRecordHandlers';

export const server = setupServer(...handlers, ...studyRecordHandlers);
