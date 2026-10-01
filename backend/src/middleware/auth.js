import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../config/constants.js';

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      throw new AppError('Not authorized', HTTP_STATUS.UNAUTHORIZED);
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AppError('Invalid or expired token', HTTP_STATUS.UNAUTHORIZED));
    }
    next(error);
  }
};
