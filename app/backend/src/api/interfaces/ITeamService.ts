import TeamModel from '../../database/models/TeamModel';

export default interface ITeamService {
  readAll(): Promise<TeamModel[]>;
}
