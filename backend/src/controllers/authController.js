import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';
import { HTTP_STATUS } from '../config/constants.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Please provide username and password', HTTP_STATUS.BAD_REQUEST);
    }

    const validUsername = username === process.env.ADMIN_USERNAME;
    const validPassword = password === process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      throw new AppError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED);
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: { token }
    });
  } catch (error) {
    next(error);
  }
};
