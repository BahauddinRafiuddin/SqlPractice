import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

const protect = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      throw new ApiError(401, "Not authorized, token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to request
    req.user = decoded;
    next()
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

export default protect