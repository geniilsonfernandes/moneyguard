import { ExpenseFields } from '@/pages/Expense/shared/schema';
import generateHashId from '@/utils/generateHashId';
import LocalStorageUtil from '@/utils/useStorage';

export type ExpenseStorageDTO = ExpenseFields & {
  id: string;
  created_at: Date;
  user_id: string;
};

export type BudgetsWithId = {
  name: string;
  id: string;
  value: number;
} & {
  id: string;
  created_at: Date;
};

const keys = {
  expenses: '@money/expenses',
  budgets: '@money/budgets'
};

const financialRecordStorage = new LocalStorageUtil<ExpenseStorageDTO>(keys.expenses);
const budgetStorage = new LocalStorageUtil<BudgetsWithId>(keys.budgets);

const hasBudgets = budgetStorage.getData().length > 0;
if (!hasBudgets) {
  budgetStorage.saveData([
    {
      name: 'Salário',
      id: generateHashId(),
      value: 1000,
      created_at: new Date()
    },
    {
      name: 'Lazer',
      id: generateHashId(),
      value: 1000,
      created_at: new Date()
    },
    {
      name: 'Transporte',
      id: generateHashId(),
      value: 1000,
      created_at: new Date()
    }
  ]);
}

export { financialRecordStorage, budgetStorage };
