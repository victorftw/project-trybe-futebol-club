import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

export default class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  async readMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const filter = inProgress === undefined ? undefined : inProgress === 'true';

    try {
      const result = await this._service.readMatches(filter);
      return res.status(200).json(result);
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }

  async finishMatches(req: Request, res: Response) {
    const { id } = req.params;
    try {
      this._service.finishMatches(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }

  async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    try {
      this._service.updateMatches(Number(id), req.body);
      return res.status(200).json({ message: 'Match updated successfully' });
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }

  async addNewMatches(req: Request, res: Response) {
    try {
      const response = await this._service.addNewMatches(req.body);
      return res.status(201).json(response);
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }
}
