import ExpenseDTO from '@/http/api/DTO/ExpenseDTO';
import { useMemo } from 'react';

type CalculateExpenseReturn = {
  income: number;
  incomeQuantity: number;
  expenseQuantity: number;
  expense: number;
  total: number;
  totalInMonth: number;
};

const calculateExpense = (expenses: ExpenseDTO[]): CalculateExpenseReturn => {
  if (expenses.length === 0) {
    return {
      income: 0,
      expense: 0,
      incomeQuantity: 0,
      expenseQuantity: 0,
      total: 0,
      totalInMonth: 0
    };
  }

  return expenses.reduce(
    (acc, record: ExpenseDTO) => {
      const { periodicity_mode, duration = 1 } = record;

      const valueToPay = periodicity_mode === 'MONTHLY' ? record.amount / duration : record.amount;

      if (record.type === 'EXPENSE') {
        return {
          income: acc.income,
          expense: acc.expense + valueToPay,
          total: acc.total - valueToPay,
          expenseQuantity: acc.expenseQuantity + 1,
          incomeQuantity: acc.incomeQuantity,
          totalInMonth: acc.totalInMonth
        };
      }
      if (record.type === 'INCOME') {
        return {
          income: acc.income + valueToPay,
          incomeQuantity: acc.incomeQuantity + 1,
          expense: acc.expense,
          total: acc.total + valueToPay,
          expenseQuantity: acc.expenseQuantity,
          totalInMonth: acc.totalInMonth
        };
      }
      return acc;
    },
    {
      income: 0,
      incomeQuantity: 0,
      expenseQuantity: 0,
      expense: 0,
      total: 0,
      totalInMonth: 0
    }
  );
};

type UseCalculateExpenseReturn = CalculateExpenseReturn;

const useCalculateExpense = (expenses: ExpenseDTO[]): UseCalculateExpenseReturn => {
  const calcute = useMemo(() => calculateExpense(expenses), [expenses]);

  return calcute;
};

export default useCalculateExpense;
