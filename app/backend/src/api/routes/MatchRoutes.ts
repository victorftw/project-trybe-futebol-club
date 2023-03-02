import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/matches', (req: Request, res: Response) =>
  matchController.readMatches(req, res));
// matchRouter.get('/matches', (req: Request, res: Response) => matchController.readAll(req, res));

export default matchRouter;
