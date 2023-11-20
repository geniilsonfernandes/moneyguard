import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ExpenseStorageDTO, financialRecordStorage } from '../storage';
import dayjs from 'dayjs';
import { RootState } from '..';

type origins = 'create' | 'update' | 'delete' | null;

interface DataState {
  data: ExpenseStorageDTO[];
  loading: boolean;
  error: string | null;
  origin: origins;
  hydrating: boolean;
  month?: string;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  origin: null,
  hydrating: false,
  month: dayjs().format('MM/YYYY')
};

function filterExpensesByMonth(expenses: ExpenseStorageDTO[], month: string): ExpenseStorageDTO[] {
  const filteredExpenses: ExpenseStorageDTO[] = [];

  expenses.forEach((expense) => {
    const { periodicity_mode } = expense;

    if (periodicity_mode === 'fixed') {
      filteredExpenses.push(expense);
      return;
    }
    const period = expense.period_date || [];

    const hasDateInPeriod = period.some((date: Date) => {
      const expenseDate = dayjs(date).format('MM/YYYY');

      return expenseDate === month;
    });

    if (hasDateInPeriod) {
      filteredExpenses.push(expense);
    }
  });

  return filteredExpenses;
}

const financialRecordsSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<ExpenseStorageDTO[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    hydrateExpenses(state) {
      state.hydrating = true;
    },
    hydrateExpensesSuccess(state, action: PayloadAction<ExpenseStorageDTO[]>) {
      state.hydrating = false;
      state.data = action.payload;
    },
    financialRecordsSetOrigin(state, action: PayloadAction<origins>) {
      state.origin = action.payload;
    },
    financialRecordsClearOrigin(state) {
      state.origin = null;
    },
    setMonth(state, action: PayloadAction<string>) {
      state.month = action.payload;
    }
  }
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  financialRecordsSetOrigin,
  financialRecordsClearOrigin,
  hydrateExpenses,
  hydrateExpensesSuccess,
  setMonth
} = financialRecordsSlice.actions;

type getExpensesProps = {
  month?: string; //  12/2023
};

export const getExpenses =
  ({ month = dayjs().format('MM/YYYY') }: getExpensesProps = {}) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchDataStart());
    try {
      dispatch(setMonth(month));
      const data = financialRecordStorage.getData();

      dispatch(fetchDataSuccess(filterExpensesByMonth(data, month)));
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao carregar os dados'));
    }
  };

export const initHydrateExpenses = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(hydrateExpenses());
  try {
    const { month = dayjs().format('MM/YYYY') } = getState().expenses;

    const data = financialRecordStorage.getData();

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        dispatch(hydrateExpensesSuccess(filterExpensesByMonth(data, month)));
      }, 4000);
    });
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao carregar os dados'));
  }
};

export default financialRecordsSlice.reducer;
