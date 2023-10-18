import { loginHandler } from './loginHandler';
import { participantCodesHandler } from './participantCodesHandler';
import { participantsHandler } from './participantsHandler';
import { studiesHandler } from './studiesHandler';

export const handlers = [...studiesHandler, ...loginHandler, ...participantsHandler, ...participantCodesHandler];
