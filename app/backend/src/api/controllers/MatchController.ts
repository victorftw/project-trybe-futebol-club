import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

export default class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response) {
    try {
      const result = await this._service.readAll();
      return res.status(200).json(result);
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }
}
