import { ExpenseFields } from '@/pages/Expense/shared/schema';
import generateHashId from '@/utils/generateHashId';
import LocalStorageUtil from '@/utils/useStorage';

export type ExpenseFieldsWithId = ExpenseFields & {
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

const financialRecordStorage = new LocalStorageUtil<ExpenseFieldsWithId>('financialRecords');
const budgetStorage = new LocalStorageUtil<BudgetsWithId>('budgets');

const hasBudgets = budgetStorage.getData().length > 0;
if (!hasBudgets) {
  budgetStorage.saveData([
    {
      name: 'Casa',
      id: generateHashId(),
      value: 100,
      created_at: new Date()
    },
    {
      name: 'Lazer',
      id: generateHashId(),
      value: 200,
      created_at: new Date()
    },
    {
      name: 'Transporte',
      id: generateHashId(),
      value: 300,
      created_at: new Date()
    }
  ]);
}

export { financialRecordStorage, budgetStorage };
