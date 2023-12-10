export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

interface IApiBaseResponse {
  message: string;
}

export interface IUserResponse extends IApiBaseResponse {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  auth: {
    token: string;
    refresh_token: string;
  };
}

//  login

export interface IloginPayload {
  email: string;
  password: string;
}

export interface IloginResponse extends IApiBaseResponse {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
  refresh_token: string;
}
