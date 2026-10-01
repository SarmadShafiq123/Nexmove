import rateLimit from 'express-rate-limit';
import { RATE_LIMIT_CONFIG } from '../config/constants.js';

export const leadSubmissionLimiter = rateLimit({
  windowMs: RATE_LIMIT_CONFIG.LEAD_SUBMISSION.windowMs,
  max: RATE_LIMIT_CONFIG.LEAD_SUBMISSION.max,
  message: {
    status: 'error',
    message: RATE_LIMIT_CONFIG.LEAD_SUBMISSION.message
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'development'
});

export const generalLimiter = rateLimit({
  windowMs: RATE_LIMIT_CONFIG.GENERAL.windowMs,
  max: RATE_LIMIT_CONFIG.GENERAL.max,
  message: {
    status: 'error',
    message: RATE_LIMIT_CONFIG.GENERAL.message
  },
  standardHeaders: true,
  legacyHeaders: false
});
