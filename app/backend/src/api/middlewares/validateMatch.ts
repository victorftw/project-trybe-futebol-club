import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

const teamService = new TeamService();

const validateMatch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  try {
    await teamService.readById(homeTeamId);
    await teamService.readById(awayTeamId);
  } catch ({ message }) {
    return res.status(404).json({ message });
  }

  next();
};

export default validateMatch;
