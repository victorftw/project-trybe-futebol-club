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

  async updateMatches(
    id: number,
    data: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<void> {
    await this.model.update(data, { where: { id } });
  }

  async addNewMatches(match: IMatch): Promise<IMatch> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const inProgress = true;
    const { id } = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });
    return { id, homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress };
  }
}
