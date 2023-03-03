import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import validateMatch from '../middlewares/validateMatch';
import validateToken from '../middlewares/validateToken';
import MatchService from '../services/MatchService';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/matches', (req: Request, res: Response) =>
  matchController.readMatches(req, res));

matchRouter.post(
  '/matches',
  validateToken,
  validateMatch,
  (req: Request, res: Response) => matchController.addNewMatches(req, res),
);

matchRouter.patch(
  '/matches/:id',
  validateToken,
  (req: Request, res: Response) => matchController.updateMatches(req, res),
);

matchRouter.patch(
  '/matches/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchController.finishMatches(req, res),
);

export default matchRouter;
