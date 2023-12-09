import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { ExpensesType, PaymentMode, PeriodicityMode } from '@/http/api/DTO/ExpenseDTO';
import { api } from '@/http/api/api';
import endpoints from '@/http/api/endpoints';
import { StorageError } from '@/utils/useStorage';
import { RootState } from '..';
import { getUser } from './auth';
import { expenseCache } from '../cache';

export type CreateExpensePayload = {
  amount: number;
  due_date: Date;
  name: string;
  user_id: string;
  budget_id: string;
  duration: number;
  note: string;
  payment_mode: keyof typeof PaymentMode;
  type: keyof typeof ExpensesType;
  periodicity_mode: keyof typeof PeriodicityMode;
  period_dates: string[];
};

type Error = {
  message: string | null;
  status: boolean;
  details?: string;
} | null;

type upadateProps = {
  data: CreateExpensePayload;
  id: string;
};
// financialRecordStorage.addItem(data);

interface DataState {
  loading: boolean;
  error: Error;
  success: boolean | null;
}

const initialState: DataState = {
  loading: false,
  error: null,
  success: null
};

const createExpenseSlice = createSlice({
  name: 'create/expense',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    fetchDataSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    fetchDataFailure(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = createExpenseSlice.actions;

export const updateExepense =
  ({ data, id }: upadateProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { user_id } = getState().auth;

    dispatch(fetchDataStart());
    try {
      await api.post(endpoints.expenses.update(id), {
        ...data,
        user_id: user_id
      });

      expenseCache.invalidateAllCache();
      dispatch(fetchDataSuccess());

      return true;
    } catch (error) {
      dispatch(
        fetchDataFailure({
          message: 'Orçamento não encontrado',
          status: true,
          details: 'Orcamento não encontrado'
        })
      );

      throw error;
    }
  };

export const createExpense =
  ({ payload }: { payload: CreateExpensePayload }) =>
  async (dispatch: Dispatch) => {
    const user = getUser();

    dispatch(fetchDataStart());
    try {
      await api.post(endpoints.expenses.create(), {
        ...payload,
        user_id: user?.user_id
      });

      expenseCache.invalidateAllCache();
      dispatch(fetchDataSuccess());

      return true;
    } catch (error) {
      if (error instanceof StorageError) {
        dispatch(
          fetchDataFailure({
            message: 'Não foi possível criar o orcamento',
            status: true,
            details: error.message
          })
        );
        return;
      }
      throw error;
    }
  };

export default createExpenseSlice.reducer;
