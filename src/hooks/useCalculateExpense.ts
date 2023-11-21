import { ExpenseStorageDTO } from '@/store/storage';

type CalculateExpenseReturn = {
  income: number;
  incomeQuantity: number;
  expenseQuantity: number;
  expense: number;
  total: number;
};

const calculateExpense = (expenses: ExpenseStorageDTO[]): CalculateExpenseReturn => {
  if (expenses.length === 0) {
    return {
      income: 0,
      expense: 0,
      incomeQuantity: 0,
      expenseQuantity: 0,
      total: 0
    };
  }

  return expenses.reduce(
    (acc, record) => {
      const { periodicity_mode, payment_mode, duration = 1 } = record;

      const valueToPay =
        payment_mode === 'parcel' && periodicity_mode === 'repeat'
          ? record.value / duration
          : record.value;

      if (record.type === 'expense') {
        return {
          income: acc.income,
          expense: acc.expense + valueToPay,
          total: acc.total - valueToPay,
          expenseQuantity: acc.expenseQuantity + 1,
          incomeQuantity: acc.incomeQuantity
        };
      }
      if (record.type === 'income') {
        return {
          income: acc.income + valueToPay,
          incomeQuantity: acc.incomeQuantity + 1,
          expense: acc.expense,
          total: acc.total + valueToPay,
          expenseQuantity: acc.expenseQuantity
        };
      }
      return acc;
    },
    {
      income: 0,
      incomeQuantity: 0,
      expenseQuantity: 0,
      expense: 0,
      total: 0
    }
  );
};

type UseCalculateExpenseReturn = CalculateExpenseReturn;

const useCalculateExpense = (expenses: ExpenseStorageDTO[]): UseCalculateExpenseReturn => {
  return calculateExpense(expenses);
};

export default useCalculateExpense;
