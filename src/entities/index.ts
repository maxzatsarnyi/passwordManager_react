export type Token = string | null;

export interface IAccountData {
  _id?: string;
  title: string;
  login: string;
  password: string;
  userId?: Token;
}

export interface IAuthData {
  login: string;
  password: string;
}

export type ErrorType = {
  isError: boolean;
  text: string;
};
