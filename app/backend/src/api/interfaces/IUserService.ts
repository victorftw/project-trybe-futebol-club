export default interface IUserService {
  readUser(email: string, password: string): Promise<string>;
}
