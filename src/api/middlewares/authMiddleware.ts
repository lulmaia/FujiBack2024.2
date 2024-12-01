import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import jwtConfig from '../../config/jwtConfig';

export interface AuthRequest extends Request {
  user?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as { id: string };
    req.user = decoded.id;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ msg: 'Invalid token format' });
    } else if (error instanceof TokenExpiredError) {
      console.error('Token expired error:', error.message);
      return res.status(401).json({ msg: 'Token expired' });
    } else {
      console.error('Unexpected error:', error);
      return res.status(401).json({ msg: 'Invalid token' });
    }
  }
};

export default authMiddleware;
