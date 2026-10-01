import mongoose from 'mongoose';
import { LEAD_STATUS, TRUCK_TYPES } from '../config/constants.js';

const leadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters'],
    index: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
    index: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ],
    index: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Please provide a valid phone number'
    ]
  },
  truckType: {
    type: String,
    required: [true, 'Truck type is required'],
    enum: {
      values: Object.values(TRUCK_TYPES),
      message: '{VALUE} is not a valid truck type'
    },
    index: true
  },
  mcNumber: {
    type: String,
    required: [true, 'MC Number is required'],
    trim: true,
    maxlength: [20, 'MC Number cannot exceed 20 characters']
  },
  dotNumber: {
    type: String,
    required: [true, 'DOT Number is required'],
    trim: true,
    maxlength: [20, 'DOT Number cannot exceed 20 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: Object.values(LEAD_STATUS),
    default: LEAD_STATUS.NEW,
    index: true
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1, createdAt: -1 });
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ companyName: 'text', fullName: 'text' });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
