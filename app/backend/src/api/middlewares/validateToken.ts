import { Request, Response, NextFunction } from 'express';
import { authenticate } from '../../utils/JWT';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const payload = await authenticate(authorization);
    res.locals.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
