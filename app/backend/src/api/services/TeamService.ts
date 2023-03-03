import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import ITeamService from '../interfaces/ITeamService';
import ITeam from '../interfaces/ITeam';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async readAll(): Promise<TeamModel[]> {
    const response = await this.model.findAll();
    return response;
  }

  async readById(id: number): Promise<ITeam> {
    const response = await this.model.findOne({ where: { id } });
    if (!response) throw new Error('There is no team with such id!');
    return response;
  }
}
