import { Response, Request, NextFunction } from 'express';
import { emailSchema, passwordSchema } from '../../schemas/SchemaLogin';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const validEmail = emailSchema.validate(email);
  if (validEmail.error) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const validPassword = passwordSchema.validate(password);
  if (validPassword.error) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateLogin;
