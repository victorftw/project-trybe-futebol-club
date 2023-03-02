import IMatch from './IMatch';

export default interface IMatchService {
  readAll(): Promise<IMatch[]>;
}
