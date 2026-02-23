export interface IUser {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthResponse extends IUser {
  token: string;
}