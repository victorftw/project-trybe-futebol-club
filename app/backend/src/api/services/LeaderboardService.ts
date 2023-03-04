import { ModelStatic, literal } from 'sequelize';
import {
  balanceAndEfficiency,
  doAggregations,
  getWinnerAndPoints,
  Initial,
} from '../../utils/leaderboard';
import MatchModel from '../../database/models/MatchModel';
import TeamModel from '../../database/models/TeamModel';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

export default class LeaderboardService implements ILeaderboardService {
  protected teamModel: ModelStatic<TeamModel> = TeamModel;
  protected matchModel: ModelStatic<MatchModel> = MatchModel;

  async getInitialData() {
    const teams = (await this.teamModel.findAll({ raw: true })) as ITeam[];
    const obj: Initial = {};

    teams.forEach((team) => {
      obj[team.id] = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      };
    });

    return obj;
  }

  async getMatches(): Promise<IMatch[]> {
    return this.matchModel.findAll({
      attributes: [
        'homeTeamId',
        'homeTeamGoals',
        [literal('homeTeam.team_name'), 'homeTeamName'],
        'awayTeamId',
        'awayTeamGoals',
        [literal('awayTeam.team_name'), 'awayTeamName'],
      ],
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: [] },
        { model: this.teamModel, as: 'awayTeam', attributes: [] },
      ],
      where: { inProgress: false },
      raw: true,
    });
  }

  async getClassifications(teamSide?: 'home' | 'away') {
    const matches = await this.getMatches();
    const matchesWithExtra = getWinnerAndPoints(matches);

    let data = await this.getInitialData();
    data = doAggregations(data, matchesWithExtra, teamSide);
    balanceAndEfficiency(data);

    return Object.values(data).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) {
        return (b.goalsBalance as number) - (a.goalsBalance as number);
      }
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return b.goalsOwn - a.goalsOwn;
    });
  }
}
