import IMatch from './IMatch';

export default interface IMatchService {
  readAll(): Promise<IMatch[]>;
  readMatches(inProgress?: boolean): Promise<IMatch[]>;
}
