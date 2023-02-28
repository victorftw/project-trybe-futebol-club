import ITeam from './ITeam';

export default interface ITeamService {
  readAll(): Promise<ITeam[]>;
  readById(id: number): Promise<ITeam>;
}
