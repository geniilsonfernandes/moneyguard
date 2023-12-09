import { ICreateUser, IUserResponse, moneyApi } from '@/http/api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

type Error = {
  message: string | null;
  status: boolean;
  details?: string;
} | null;
interface DataState {
  loading: boolean;
  error: Error;
  success: boolean | null;
  user: IUserResponse['user'] | null;
  auth: {
    token: string;
    refresh_token: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: DataState = {
  loading: false,
  error: null,
  success: null,

  isAuthenticated: false,
  user: null,
  auth: null
};

type LoginPayload = {
  user: IUserResponse['user'];
  auth: IUserResponse['auth'];
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

export const { login, logout, fetchDataFailure, fetchDataStart, fetchDataSuccess } =
  authSlice.actions;

export const createUser = (payload: ICreateUser) => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchDataStart());
    const {
      data: { user, auth }
    } = await moneyApi.createUser(payload);

    saveUser({ user, auth });
    dispatch(login({ user, auth }));
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
