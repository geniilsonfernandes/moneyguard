import { SettingDTO } from './DTO/SettingDTO';
import BudgetDTO from './DTO/BudgetDTO';

interface IApiBaseResponse {
  message: string;
}

export interface ICreateUserPayload {
  name: string;
  email: string;
  password: string;
  monthlyBudget: number;
}

//  login

export interface IloginPayload {
  email: string;
  password: string;
}

// login response
export interface IUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  budget: BudgetDTO[];
  settings: SettingDTO;
}
export interface IAuth {
  token: string;
  refresh_token: string;
}

export interface IUserloginResponse extends IApiBaseResponse {
  user: IUser;
  auth: IAuth;
}

export interface IUserCreateResponse extends IApiBaseResponse {
  user: IUser;
  auth: IAuth;
}
