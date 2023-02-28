import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import ITeamService from '../interfaces/ITeamService';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async readAll(): Promise<TeamModel[]> {
    const response = await this.model.findAll();
    return response;
  }
}
