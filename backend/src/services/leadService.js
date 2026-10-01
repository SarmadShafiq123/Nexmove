import leadRepository from '../repositories/leadRepository.js';
import { AppError } from '../utils/appError.js';

class LeadService {
  async createLead(leadData) {
    try {
      return await leadRepository.create(leadData);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(messages.join(', '), 400);
      }
      throw error;
    }
  }

  async getLeads(filters = {}, page = 1, limit = 10) {
    const { leads, total } = await leadRepository.findAll(filters, {
      page: parseInt(page),
      limit: parseInt(limit)
    });

    return {
      leads,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalLeads: total,
        leadsPerPage: parseInt(limit)
      }
    };
  }

  async getLeadById(id) {
    return await leadRepository.findById(id);
  }

  async updateLeadStatus(id, status) {
    const validStatuses = ['new', 'contacted', 'qualified', 'rejected'];
    
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid status value', 400);
    }

    return await leadRepository.updateStatus(id, status);
  }

  async deleteLead(id) {
    return await leadRepository.delete(id);
  }

  async getLeadStatistics() {
    const [newCount, contactedCount, qualifiedCount, rejectedCount] = await Promise.all([
      leadRepository.countByStatus('new'),
      leadRepository.countByStatus('contacted'),
      leadRepository.countByStatus('qualified'),
      leadRepository.countByStatus('rejected')
    ]);

    return {
      new: newCount,
      contacted: contactedCount,
      qualified: qualifiedCount,
      rejected: rejectedCount,
      total: newCount + contactedCount + qualifiedCount + rejectedCount
    };
  }
}

export default new LeadService();
