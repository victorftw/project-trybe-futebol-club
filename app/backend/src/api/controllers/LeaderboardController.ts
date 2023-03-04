import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/ILeaderboardService';

export default class LeaderboardController {
  private _service: ILeaderboardService;

  constructor(service: ILeaderboardService) {
    this._service = service;
  }

  async getClassifications(req: Request, res: Response) {
    const { teamSide } = req.params;

    const items = await this._service.getClassifications(teamSide);

    res.status(200).json(items);
  }
}
