import { body, param } from 'express-validator';
import { TRUCK_TYPES, LEAD_STATUS } from '../config/constants.js';

export const validateLead = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Full name can only contain letters, spaces, hyphens, and apostrophes'),

  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .withMessage('Please provide a valid phone number'),

  body('truckType')
    .trim()
    .notEmpty()
    .withMessage('Truck type is required')
    .isIn(Object.values(TRUCK_TYPES))
    .withMessage('Please select a valid truck type'),

  body('mcNumber')
    .trim()
    .notEmpty()
    .withMessage('MC Number is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('MC Number must be between 1 and 20 characters')
    .isAlphanumeric()
    .withMessage('MC Number must contain only letters and numbers'),

  body('dotNumber')
    .trim()
    .notEmpty()
    .withMessage('DOT Number is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('DOT Number must be between 1 and 20 characters')
    .isAlphanumeric()
    .withMessage('DOT Number must contain only letters and numbers'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

export const validateLeadStatus = [
  param('id')
    .isMongoId()
    .withMessage('Invalid lead ID'),

  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(Object.values(LEAD_STATUS))
    .withMessage('Invalid status value')
];
