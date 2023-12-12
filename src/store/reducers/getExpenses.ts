import BudgetDTO from '@/http/api/DTO/BudgetDTO';
import ExpenseDTO from '@/http/api/DTO/ExpenseDTO';
import { api } from '@/http/api/api';
import endpoints, { BudgetsResponse, ExpensesResponse } from '@/http/api/endpoints';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Dispatch } from 'redux';
import { RootState } from '..';
import { getUser } from './auth';

type origins = 'dash' | 'update' | 'delete' | null;

interface DataState {
  data: ExpenseDTO[];
  loading: boolean;
  error: string | null;
  origin: origins;
  hydrating: boolean;
  month?: string;
  currentMonthExpenses?: ExpenseDTO[];
  budgets?: BudgetDTO[];
}

const initialState: DataState = {
  data: [],
  budgets: [],
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
    setExpensesBudgets(state, action: PayloadAction<BudgetDTO[]>) {
      state.budgets = action.payload;
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
  setMonth,
  setExpensesBudgets
} = financialRecordsSlice.actions;

type getExpensesProps = {
  month?: string;
};
type getHidrateExpensesProps = {
  current_month?: string;
  invalidateAllCache?: boolean;
};

export const getExpenses =
  ({ month = dayjs().format('MM/YYYY') }: getExpensesProps = {}) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchDataStart());
    const { user } = getState().auth;
    const storageUser = getUser();

    try {
      dispatch(setMonth(month));
      const {
        data: { budgets }
      } = await api.get<BudgetsResponse>(endpoints.budgets.get(), {
        params: {
          user_id: user?.id || storageUser?.user.id
        }
      });

      dispatch(setExpensesBudgets(budgets));

      const {
        data: { expenses }
      } = await api.get<ExpensesResponse>(endpoints.expenses.get(), {
        params: {
          user_id: user?.id || storageUser?.user.id,
          period: month
        }
      });

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

      dispatch(hydrateExpensesSuccess(expenses));
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao carregar os dados'));
    }
  };

export default financialRecordsSlice.reducer;
