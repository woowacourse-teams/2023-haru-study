import { loginHandler } from './loginHandler';
import { studiesHandler } from './studiesHandler';

export const handlers = [...studiesHandler, ...loginHandler];
