import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/leaderboard/:teamSide?', (req: Request, res: Response) =>
  leaderboardController.getClassifications(req, res));

export default leaderboardRouter;
