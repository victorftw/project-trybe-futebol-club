import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import IMatchService from '../interfaces/IMatchService';

export default class MatchService implements IMatchService {
  protected model: ModelStatic<MatchModel> = MatchModel;

  async readMatches(inProgress?: boolean): Promise<IMatch[]> {
    if (inProgress === undefined) {
      const response = await this.model.findAll({
        include: [
          { model: TeamModel, as: 'homeTeam' },
          { model: TeamModel, as: 'awayTeam' },
        ],
      });
      return response;
    }
    const response = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
      where: { inProgress },
    });
    return response;
  }

  async finishMatches(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
