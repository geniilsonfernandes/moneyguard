interface ExpenseDTO {
  id: string;
  user_id: string;
  budget_id: string;
  type: ExpensesType;
  name: string;
  note: string;
  amount: number;
  payment_mode: PaymentMode;
  periodicity_mode: PeriodicityMode;
  dueDate: string;
  period_dates: string[];
  duration: number;
  created_at: string;
  updated_at: string;
}

export enum ExpensesType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum PeriodicityMode {
  ONCE = 'ONCE',
  MONTHLY = 'MONTHLY',
  FIXED = 'FIXED'
}

export enum PaymentMode {
  ALL = 'ALL',
  PARCEL = 'PARCEL'
}

export default ExpenseDTO;
