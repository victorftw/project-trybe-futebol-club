import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

export default class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async readById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this._service.readById(Number(id));
      return res.status(200).json(result);
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }
}
