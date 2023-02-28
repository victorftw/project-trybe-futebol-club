import { hash, compare } from 'bcryptjs';

const code = async (password: string): Promise<string> => {
  const response = await hash(password, 8);
  return response;
};

const decode = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const response = await compare(password, hashedPassword);
  return response;
};

export { code, decode };
