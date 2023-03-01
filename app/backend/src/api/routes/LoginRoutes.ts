import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import UserService from '../services/UserService';

const loginRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

loginRouter.post(
  '/login',
  validateLogin,
  (req: Request, res: Response) => userController.readUser(req, res),
);

export default loginRouter;
