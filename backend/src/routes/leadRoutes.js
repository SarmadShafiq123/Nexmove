import express from 'express';
import { createLead, getLeads, getLeadById, updateLeadStatus } from '../controllers/leadController.js';
import { validateLead, validateLeadStatus } from '../validators/leadValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { leadSubmissionLimiter } from '../middleware/rateLimiter.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/',
  leadSubmissionLimiter,
  validateLead,
  validateRequest,
  createLead
);

router.get('/', protect, getLeads);

router.get('/:id', protect, getLeadById);

router.patch(
  '/:id/status',
  protect,
  validateLeadStatus,
  validateRequest,
  updateLeadStatus
);

export default router;
