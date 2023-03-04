import IMatch from './IMatch';

export default interface IMatchExtra extends IMatch {
  homeTeamPoints: number;
  awayTeamPoints: number;
  winner: number | null;
}
