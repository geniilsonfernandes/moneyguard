import ExpenseDTO from '@/http/api/DTO/ExpenseDTO';
import { api } from '@/http/api/api';
import endpoints, { BudgetsResponse, ExpensesResponse } from '@/http/api/endpoints';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Dispatch } from 'redux';
import { RootState } from '..';

import { expenseCache } from '../cache';
import { setBudgets } from './budgets';

type origins = 'create' | 'update' | 'delete' | null;

interface DataState {
  data: ExpenseDTO[];
  loading: boolean;
  error: string | null;
  origin: origins;
  hydrating: boolean;
  month?: string;
  currentMonthExpenses?: ExpenseDTO[];
}

const initialState: DataState = {
  data: [],

  loading: false,
  error: null,
  origin: null,
  hydrating: false,
  month: dayjs().format('MM/YYYY')
};

const financialRecordsSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<ExpenseDTO[]>) {
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
    hydrateExpensesSuccess(state, action: PayloadAction<ExpenseDTO[]>) {
      state.hydrating = false;
      state.data = action.payload;
    },
    setCurrentMonthExpenses(state, action: PayloadAction<ExpenseDTO[]>) {
      state.currentMonthExpenses = action.payload;
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
  setCurrentMonthExpenses,
  setMonth
} = financialRecordsSlice.actions;

type getExpensesProps = {
  month?: string;
};
type getHidrateExpensesProps = {
  current_month?: string;
};

export const getExpenses =
  ({ month = dayjs().format('MM/YYYY') }: getExpensesProps = {}) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchDataStart());
    const { user } = getState().auth;

    const cacheKey = `${endpoints.budgets.get()}${month}${user?.id}`;

    try {
      dispatch(setMonth(month));

      const {
        data: { budgets }
      } = await api.get<BudgetsResponse>(endpoints.budgets.get(), {
        params: {
          user_id: user?.id
        }
      });

      dispatch(setBudgets(budgets));

      const cacheData = expenseCache.getCache(cacheKey);

      if (cacheData) {
        dispatch(fetchDataSuccess(cacheData));
        dispatch(setCurrentMonthExpenses(cacheData));
        return;
      }

      const {
        data: { expenses }
      } = await api.get<ExpensesResponse>(endpoints.expenses.get(), {
        params: {
          user_id: user?.id,
          period: month
        }
      });

      expenseCache.setCache(cacheKey, expenses);

      dispatch(fetchDataSuccess(expenses));
      dispatch(setCurrentMonthExpenses(expenses));
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao carregar os dados'));
    }
  };

export const initHydrateExpenses =
  ({ current_month = dayjs().format('MM/YYYY') }: getHidrateExpensesProps = {}) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(hydrateExpenses());

    const monthquery = current_month || getState().expenses.month || dayjs().format('MM/YYYY');

    const cacheKey = `${endpoints.budgets.get()}${monthquery}${getState().auth.user?.id}`;

    const cacheData = expenseCache.getCache(cacheKey);

    if (cacheData) {
      dispatch(hydrateExpensesSuccess(cacheData));
      return;
    }
    try {
      const { user } = getState().auth;

      const {
        data: { expenses }
      } = await api.get<ExpensesResponse>(endpoints.expenses.get(), {
        params: {
          user_id: user?.id,
          period: monthquery
        }
      });

      expenseCache.setCache(cacheKey, expenses);
      dispatch(hydrateExpensesSuccess(expenses));
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao carregar os dados'));
    }
  };

export default financialRecordsSlice.reducer;
