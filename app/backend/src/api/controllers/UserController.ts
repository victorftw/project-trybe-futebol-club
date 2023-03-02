import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';

export default class UserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async readLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this._service.readLogin(email, password);
      return res.status(200).json({ token });
    } catch ({ message }) {
      return res.status(401).json({ message });
    }
  }

  static async readRole(_req: Request, res: Response) {
    const { role } = res.locals.user;
    return res.status(200).json({ role });
  }
}
