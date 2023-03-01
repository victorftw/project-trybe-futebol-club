import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';

export default class UserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async readUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this._service.readUser(email, password);
      return res.status(200).json({ token });
    } catch ({ message }) {
      return res.status(401).json({ message });
    }
  }
}
