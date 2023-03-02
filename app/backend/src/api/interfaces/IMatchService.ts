import IMatch from './IMatch';

export default interface IMatchService {
  readMatches(inProgress?: boolean): Promise<IMatch[]>;
}
