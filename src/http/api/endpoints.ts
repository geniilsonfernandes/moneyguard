import BudgetDTO from './DTO/BudgetDTO';
import ExpenseDTO from './DTO/ExpenseDTO';

const endpoints = {
  expenses: {
    get: () => `/expenses`,
    getById: (id: string) => `/expense/${id}`,
    create: () => `/expenses`,
    update: (id: string) => `/expenses/${id}`,
    delete: (id: string) => `/expenses/${id}`
  },
  users: {
    get: () => `/users`,
    create: () => `/users`
  },
  budgets: {
    get: () => '/budgets'
  }
};

export interface ExpensesResponse {
  expenses: ExpenseDTO[];
  count: number;
}
export interface ExpenseResponse {
  expense: ExpenseDTO;
}

export interface BudgetsResponse {
  budgets: BudgetDTO[];
  count: number;
}

export default endpoints;
