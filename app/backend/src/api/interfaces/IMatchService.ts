import IMatch from './IMatch';

export default interface IMatchService {
  readMatches(inProgress?: boolean): Promise<IMatch[]>;
  finishMatches(id: number): void;
  updateMatches(id: number, data: { homeTeamGoals: number, awayTeamGoals: number }): void;
}
