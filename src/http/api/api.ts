import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
    return Promise.reject(error);
  }
);

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

class MoneyApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_BASE_URL
      // outras configurações
    });

    // Adiciona um interceptor de requisição para capturar a URL
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log('URL da requisição:', config.url); // Aqui está a URL da requisição
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Adiciona um interceptor de resposta para capturar a URL
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('URL da resposta:', response.config.url); // Aqui está a URL da resposta
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public async createUser(payload: ICreateUser) {
    const response = await this.api.post<IUserResponse>('/users', payload);
    return response;
  }

  // Outros métodos para outras requisições...
}

export const moneyApi = new MoneyApi();

export const api = axiosInstance;
