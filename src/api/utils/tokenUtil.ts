import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwtConfig';

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};
