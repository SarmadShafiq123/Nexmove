import leadService from '../services/leadService.js';
import emailService from '../services/emailService.js';
import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../config/constants.js';

export const createLead = async (req, res, next) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip || req.socket?.remoteAddress,
      userAgent: req.get('user-agent')
    };

    const lead = await leadService.createLead(leadData);

    emailService.sendLeadNotification(lead).catch(error => {
      console.error('Email notification failed:', error.message);
    });

    res.status(HTTP_STATUS.CREATED).json({
      status: 'success',
      message: 'Your information has been submitted successfully. We will contact you soon!',
      data: {
        lead: {
          id: lead._id,
          fullName: lead.fullName,
          companyName: lead.companyName,
          email: lead.email,
          createdAt: lead.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (search) {
      filters.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const result = await leadService.getLeads(filters, page, limit);

    res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lead = await leadService.getLeadById(id);

    if (!lead) {
      throw new AppError('Lead not found', HTTP_STATUS.NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: { lead }
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await leadService.updateLeadStatus(id, status);

    if (!lead) {
      throw new AppError('Lead not found', HTTP_STATUS.NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json({
      status: 'success',
      message: 'Lead status updated successfully',
      data: { lead }
    });
  } catch (error) {
    next(error);
  }
};
