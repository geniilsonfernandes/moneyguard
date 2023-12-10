import { getUser, removeUser } from '@/store/reducers/auth';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  ICreateUserPayload,
  IUserCreateResponse,
  IUserloginResponse,
  IloginPayload
} from './types';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const {
      auth: { token }
    } = getUser();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeUser();
      window.location.reload();
      return;
    }

    return Promise.reject(error);
  }
);

class MoneyApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_BASE_URL
    });

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public async createUser(payload: ICreateUserPayload) {
    const response = await this.api.post<IUserCreateResponse>('/users', payload);
    return response;
  }

  public async login(payload: IloginPayload) {
    const response = await this.api.post<IUserloginResponse>('/auth/login', payload);
    return response;
  }
}

export const moneyApi = new MoneyApi();

export const api = axiosInstance;
