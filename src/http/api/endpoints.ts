import ExpenseDTO from './DTO/ExpenseDTO';

const endpoints = {
  expenses: {
    get: () => `/expenses`,
    create: () => `/expenses`,
    update: (id: string) => `/expenses/${id}`,
    delete: (id: string) => `/expenses/${id}`
  },
  users: {
    get: () => `/users`,
    create: () => `/users`
  }
};

export interface ExpenseAxiosResponse {
  expenses: ExpenseDTO[];
  count: number;
}

export default endpoints;
