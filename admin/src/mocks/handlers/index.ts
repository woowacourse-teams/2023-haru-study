import { loginHandler } from './loginHandler';
import { partipantsHandler } from './participantsHandler';
import { studiesHandler } from './studiesHandler';

export const handlers = [...studiesHandler, ...loginHandler, ...partipantsHandler];
