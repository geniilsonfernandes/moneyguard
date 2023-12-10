import { moneyApi } from '@/http/api/api';
import { ICreateUser, IUserResponse, IloginPayload } from '@/http/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

interface ICreateUserPayload extends ICreateUser {
  monthlyBudget: number;
}

type Error = {
  message: string | null;
  status: boolean;
  details?: string;
} | null;

interface DataState {
  loading: boolean;
  error: Error;
  success: boolean | null;
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  } | null;
  auth: {
    token: string;
    refresh_token: string;
  } | null;
  isAuthenticated: boolean;
  userConfig: {
    monthlyBudget: number;
  };
}

const initialState: DataState = {
  loading: false,
  error: null,
  success: null,

  isAuthenticated: false,
  user: null,
  auth: null,

  userConfig: {
    monthlyBudget: 0
  }
};

type LoginPayload = {
  user: IUserResponse['user'];
  auth: IUserResponse['auth'];
  userConfig: {
    monthlyBudget: number;
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    fetchDataSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    fetchDataFailure(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },

    login(state, action: PayloadAction<LoginPayload>) {
      state.isAuthenticated = true;
      state.auth = action.payload.auth;
      state.user = action.payload.user;

      state.userConfig = action.payload.userConfig;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.auth = null;
    }
  }
});

export const saveUser = ({ user, auth }: LoginPayload) => {
  localStorage.setItem('@moneyguard:user', JSON.stringify({ user, auth }));
  return true;
};

export const getUser = (): LoginPayload => {
  const user = localStorage.getItem('@moneyguard:user');
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  console.log('logoutUser');
  localStorage.removeItem('@moneyguard:user');
  return true;
};
export const { login, logout, fetchDataFailure, fetchDataStart, fetchDataSuccess } =
  authSlice.actions;

export const logoutUser = () => async (dispatch: Dispatch) => {
  console.log('logoutUser');

  localStorage.removeItem('@moneyguard:user');
  dispatch(logout());
};

export const loginUser = (payload: IloginPayload) => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchDataStart());
    const {
      data: { user, token, refresh_token }
    } = await moneyApi.login(payload);

    const userToSave = {
      user,
      auth: {
        token,
        refresh_token
      },
      userConfig: {
        monthlyBudget: 0
      }
    };

    saveUser(userToSave);
    dispatch(login(userToSave));
    dispatch(fetchDataSuccess());
    return userToSave;
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(
        fetchDataFailure({
          message:
            error.response?.status === 401 ? 'Senha ou e-mail invalido' : 'Erro ao fazer login',
          status: true,
          details: error.response?.data.details
        })
      );
      return;
    }
    dispatch(fetchDataFailure({ message: 'Erro ao fazer login', status: true }));
  }
};

export const createUser = (payload: ICreateUserPayload) => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchDataStart());
    const {
      data: { user, auth }
    } = await moneyApi.createUser(payload);

    const userToSave = {
      user,
      auth,
      userConfig: {
        monthlyBudget: payload.monthlyBudget
      }
    };

    saveUser(userToSave);
    dispatch(login(userToSave));
    dispatch(fetchDataSuccess());
    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(
        fetchDataFailure({
          message: error.response?.status === 409 ? 'Usuário ja existe' : 'Erro ao criar o usuário',
          status: true,
          details: error.response?.data.details
        })
      );
      return;
    }
    dispatch(fetchDataFailure({ message: 'Erro ao criar o usuário', status: true }));
  }
};

export default authSlice.reducer;
