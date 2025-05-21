import { LogService } from '../services/LogService.js';

export function loggerMiddleware(req, res, next) {
  // your middleware logic
  next();
}
