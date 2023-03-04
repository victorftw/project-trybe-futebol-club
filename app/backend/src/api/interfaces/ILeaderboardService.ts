import { Data, Initial } from '../../utils/leaderboard';
import IMatch from './IMatch';

export default interface ILeaderboardService {
  getClassifications(teamSide?: string): Promise<Data[]>;
  getMatches(): Promise<IMatch[]>;
  getInitialData(): Promise<Initial>;
}
