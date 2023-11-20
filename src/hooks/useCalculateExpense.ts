import { ExpenseStorageDTO } from '@/store/storage';

type CalculateExpenseReturn = {
  income: number;
  expense: number;
  total: number;
};

const calculateExpense = (expenses: ExpenseStorageDTO[]): CalculateExpenseReturn => {
  if (expenses.length === 0) {
    return {
      income: 0,
      expense: 0,
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
          total: acc.total - valueToPay
        };
      }
      if (record.type === 'income') {
        return {
          income: acc.income + valueToPay,
          expense: acc.expense,
          total: acc.total + valueToPay
        };
      }
      return acc;
    },
    {
      income: 0,
      expense: 0,
      total: 0
    }
  );
};

type UseCalculateExpenseReturn = CalculateExpenseReturn;

const useCalculateExpense = (expenses: ExpenseStorageDTO[]): UseCalculateExpenseReturn => {
  const { expense, income, total } = calculateExpense(expenses);

  return { expense, income, total };
};

export default useCalculateExpense;
