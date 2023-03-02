import { ModelStatic } from 'sequelize';
import { decode } from '../../utils/crypt';
import generateToken from '../../utils/JWT';
import UserModel from '../../database/models/UserModel';
import IUserService from '../interfaces/IUserService';

export default class UserService implements IUserService {
  protected model: ModelStatic<UserModel> = UserModel;

  async readLogin(email: string, password: string): Promise<string> {
    const response = await this.model.findOne({
      where: { email },
    });

    if (!response) throw new Error('Invalid email or password');

    const validPassword = await decode(password, response.password);

    if (!validPassword) throw new Error('Invalid email or password');

    const { id, username, role } = response;

    const token = await generateToken({ id, username, role, email });

    return token;
  }
}
