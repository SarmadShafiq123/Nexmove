import Lead from '../models/Lead.js';

class LeadRepository {
  async create(leadData) {
    return await Lead.create(leadData);
  }

  async findById(id) {
    return await Lead.findById(id).select('-__v').lean();
  }

  async findAll(filters = {}, options = {}) {
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v')
        .lean(),
      Lead.countDocuments(filters)
    ]);

    return { leads, total };
  }

  async updateStatus(id, status) {
    return await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v').lean();
  }

  async delete(id) {
    return await Lead.findByIdAndDelete(id);
  }

  async countByStatus(status) {
    return await Lead.countDocuments({ status });
  }
}

export default new LeadRepository();
