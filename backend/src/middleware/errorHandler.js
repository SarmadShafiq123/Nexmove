import { HTTP_STATUS } from '../config/constants.js';
import { AppError } from '../utils/appError.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV !== 'production') {
    console.error('Error Stack:', err.stack);
  }

  console.error('Error Details:', {
    message: err.message,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  if (err.name === 'CastError') {
    error = new AppError('Resource not found', HTTP_STATUS.NOT_FOUND);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new AppError(
      `Duplicate value for ${field}. Please use another value`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    error = new AppError(messages.join(', '), HTTP_STATUS.BAD_REQUEST);
  }

  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token. Please log in again', HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Your token has expired. Please log in again', HTTP_STATUS.UNAUTHORIZED);
  }

  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
