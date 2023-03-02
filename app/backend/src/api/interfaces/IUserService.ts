export default interface IUserService {
  readLogin(email: string, password: string): Promise<string>;
}
