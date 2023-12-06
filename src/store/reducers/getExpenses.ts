import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Dispatch } from 'redux';
import { RootState } from '..';
import { api } from '@/http/api/api';
import ExpenseDTO from '@/http/api/DTO/ExpenseDTO';
import endpoints, { ExpenseAxiosResponse } from '@/http/api/endpoints';
import { updateUserId } from './auth';

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
  month?: string; //  12/2023
};
type getHidrateExpensesProps = {
  current_month?: string; //  12/2023
};

export const getExpenses =
  ({ month = dayjs().format('MM/YYYY') }: getExpensesProps = {}) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchDataStart());
    const { email, name, clerk_user_id } = getState().auth;
    try {
      dispatch(setMonth(month));
      const {
        data: { user }
      } = await api.post(endpoints.users.get(), {
        email,
        name,
        clerk_id: clerk_user_id
      });

      const {
        data: { expenses }
      } = await api.get<ExpenseAxiosResponse>(endpoints.expenses.get(), {
        params: {
          user_id: user.id,
          period: month
        }
      });

      dispatch(updateUserId(user.id));
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
    try {
      const monthquery = current_month || getState().expenses.month || dayjs().format('MM/YYYY');

      const { user_id } = getState().auth;

      const {
        data: { expenses }
      } = await api.get<ExpenseAxiosResponse>(endpoints.expenses.get(), {
        params: {
          user_id: user_id,
          period: monthquery
        }
      });

      dispatch(hydrateExpensesSuccess(expenses));
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao carregar os dados'));
    }
  };

export default financialRecordsSlice.reducer;
