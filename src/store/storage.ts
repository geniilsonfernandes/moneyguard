import { ExpenseFields } from '@/pages/Expense/shared/schema';
import LocalStorageUtil from '@/utils/useStorage';

export type ExpenseFieldsWithId = ExpenseFields & {
  id: string,
  created_at: Date
};

export type BudgetsWithId = {
  name: string;
  id: string;
  value: number;
} & {
  id: string,
  created_at: Date
};

const financialRecordStorage = new LocalStorageUtil<ExpenseFieldsWithId>('financialRecords');
const budgetStorage = new LocalStorageUtil<BudgetsWithId>('budgets');

const hasBudgets = budgetStorage.getData().length > 0;
if (!hasBudgets) {
  budgetStorage.saveData([
    {
      name: 'Casa',
      id: '1',
      value: 100,
      created_at: new Date()
    },
    {
      name: 'Lazer',
      id: '2',
      value: 200,
      created_at: new Date()
    },
    {
      name: 'Transporte',
      id: '3',
      value: 300,
      created_at: new Date()
    }
  ]);
}

export { financialRecordStorage, budgetStorage };
