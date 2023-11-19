import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ExpenseFieldsWithId, financialRecordStorage } from '../storage';
import dayjs from 'dayjs';

type origins = 'create' | 'update' | 'delete' | null;

interface DataState {
  data: ExpenseFieldsWithId[];
  loading: boolean;
  error: string | null;
  origin: origins;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  origin: null
};

function filterExpensesByMonth(
  expenses: ExpenseFieldsWithId[],
  month: string
): ExpenseFieldsWithId[] {
  const filteredExpenses: ExpenseFieldsWithId[] = [];

  expenses.forEach((expense) => {
    const { periodicity_mode } = expense;

    if (periodicity_mode === 'fixed') {
      filteredExpenses.push(expense);
      return;
    }
    const period = expense.period_date || [];

    const hasDateInPeriod = period.some((date) => {
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
    fetchDataSuccess(state, action: PayloadAction<ExpenseFieldsWithId[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    financialRecordsSetOrigin(state, action: PayloadAction<origins>) {
      state.origin = action.payload;
    },
    financialRecordsClearOrigin(state) {
      state.origin = null;
    }
  }
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  financialRecordsSetOrigin,
  financialRecordsClearOrigin
} = financialRecordsSlice.actions;

// export const getFinancialRecords = () => async (dispatch: Dispatch, getState: () => RootState)
export const getExpenses =
  ({
    month = dayjs().format('MM/YYYY')
  }: {
    month?: string; //  12/2023
  } = {}) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchDataStart());
    try {
      const data = financialRecordStorage.getData();

      dispatch(fetchDataSuccess(filterExpensesByMonth(data, month)));
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao carregar os dados'));
    }
  };

export default financialRecordsSlice.reducer;
