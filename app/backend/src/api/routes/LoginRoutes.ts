import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';
import UserService from '../services/UserService';

const loginRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

loginRouter.post('/login', validateLogin, (req: Request, res: Response) =>
  userController.readLogin(req, res));

loginRouter.get('/login/role', validateToken, (req: Request, res: Response) =>
  UserController.readRole(req, res));

export default loginRouter;
