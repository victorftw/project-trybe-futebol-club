import * as jwt from 'jsonwebtoken';
import IUser from '../api/interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'coelho';

const generateToken = async (data: IUser) =>
  jwt.sign(data, JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

const authenticate = async (token: string) => {
  const [, actualToken] = token.split(' ');
  if (actualToken) {
    return jwt.verify(actualToken, JWT_SECRET);
  }
  return jwt.verify(token, JWT_SECRET);
};

export default generateToken;

export { authenticate };
